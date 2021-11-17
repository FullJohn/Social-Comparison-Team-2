from bs4 import BeautifulSoup


class InstaPost:
    ###############################################################
    # InstaPost - Class                                           #
    #                                                             #
    # Description:                                                #
    #   Instagram post data and methods                           #
    #   Used for collecting data from a specific instagram post   #
    #                                                             #
    # Inputs:                                                     #
    #   post_url - the url of the post to collect data from       #
    #   driver   - webdriver from insta_user class                #
    ###############################################################

    def __init__(self, post_url, driver):

        # Class initialization function

        self.post_url = post_url
        self.driver = driver
        self.soup_list = []
        self.soup = ''

        self.description = ''
        self.brand = ''
        self.date = ''
        self.likes = 0
        self.comments = 0
        self.image_url = ''

    def create_soup(self):

        # Creates a BeautifulSoup object for parsing the HTML page

        self.driver.get("https://www.instagram.com" + self.post_url)
        self.soup = BeautifulSoup(self.driver.page_source, 'lxml')

    def collect_post(self):

        # Parses the soup object and page_source for data

        likes = self.soup.find('a', {"class": "zV_Nj"})
        if likes is None:
            likes = self.soup.find('span', {"class": "vcOH2"})

        self.likes = likes.find('span').text.replace(',', '')
        self.brand = self.soup.find('a', {"class": "sqdOP yWX7d _8A5w5 ZIAjV"}).get('href').replace('/', '')
        date = self.soup.find('a', {"class": "c-Yi7"}).find('time').get('datetime')
        self.date = date[0:date.rfind('T')]
        self.comments = self.soup.find('a', {"class": "r8ZrO"}).find('span').text
        self.description = self.soup.find('div', {"class": "QzzMF Igw0E IwRSH eGOV_ vwCYk"}).find('span').find('span').text
        image_pre_parse = self.soup.findAll('img')
        self.image_url = image_pre_parse[1].get('src')

    def print(self):

        # Prints the data collected from the instagram post

        print("Brand: ", self.brand)
        print("Description: ", self.description)
        print("Date: ", self.date)
        print("Likes: ", self.likes)
        print("Comments: ", self.comments)
        print("Image URL: ", self.image_url)
        print("Post URL: ", self.post_url)
        print("\n\n")
