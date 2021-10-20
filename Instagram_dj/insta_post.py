from bs4 import BeautifulSoup


class InstaPost:

    def __init__(self, post_url, driver):
        self.post_url = post_url
        self.soup_list = []
        self.driver = driver
        self.description = ''
        self.brand = ''
        self.description = ''
        self.likes = 0
        self.date = ''
        self.comments = 0
        self.image_url = ''
        self.soup = ''

    def create_soup(self):
        self.driver.get("https://www.instagram.com" + self.post_url)
        self.soup = BeautifulSoup(self.driver.page_source, 'lxml')

    def scrape_post(self):
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
        print("Brand: ", self.brand)
        print("Description: ", self.description)
        print("Date: ", self.date)
        print("Likes: ", self.likes)
        print("Comments: ", self.comments)
        print("Image URL: ", self.image_url)
        print("\n\n")
