from bs4 import BeautifulSoup


class TwitterPost:
    ###############################################################
    # TwitterPost - Class                                         #
    #                                                             #
    # Description:                                                #
    #   Twitter post data and methods                             #
    #   Used for collecting data from a specific Twitter post     #
    #                                                             #
    # Inputs:                                                     #
    #   post_url - the url of the post to collect data from       #
    #   driver   - webdriver from insta_user class                #
    ###############################################################

    def __init__(self, post_url, driver):

        # Class initialization function

        self.post_url = post_url
        self.soup_list = []
        self.driver = driver
        #self.description = ''
        self.brand = ''
        self.description = ''
        self.likes = 0
        self.retweets = 0
        self.date = ''
        self.comments = 0
        self.image_url = ''
        self.soup = ''

    def create_soup(self):

        # Creates a BeautifulSoup object for parsing the HTML page

        self.driver.get("https://www.twitter.com" + self.post_url)
        self.soup = BeautifulSoup(self.driver.page_source, 'lxml')

    def scrape_post(self):

        # Parses the soup object and page_source for data
        
        #@NOTE(P):Scrape brand name
        #self.brand = self.soup.find('a', {"class": "sqdOP yWX7d _8A5w5 ZIAjV"}).get('href').replace('/', '')
        
        #@NOTE(P): Scrape comments
        self.comments = self.soup.find('div', {"data-testid": "reply"})
        
        #@NOTE(P): Scrape likes
        likes = self.soup.find('div', {"data-testid": "like"})
        #self.likes = likes.find('span').text.replace(',', '')
        
        #@TODO(P): scrape retweets
        self.retweets = self.soup.find('div', {"data-testid": "retweet"})
        
        
        #@NOTE(P):Scrape the date
        #date = self.soup.find('a', {"class": "c-Yi7"}).find('time').get('datetime')
        #self.date = date[0:date.rfind('T')]
        
        #@NOTE(P): Scrape the post text if it exists
        #self.description = self.soup.find('div', {"class": "QzzMF Igw0E IwRSH eGOV_ vwCYk"}).find('span').find('span').text
        
        #NOTE(P): Scrape the image if it exists
        #image_pre_parse = self.soup.findAll('img')
        #self.image_url = image_pre_parse[1].get('src')

    def print(self):

        # Prints the data collected from the instagram post

        print("Brand:\t", self.brand)
        print("Description:\t", self.description)
        print("Date:\t", self.date)
        print("Likes:\t", self.likes)
        print("Retweets:\t")
        print("Comments:\t", self.comments)
        print("Image URL:\t", self.image_url)
        print("\n\n")
