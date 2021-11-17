from bs4 import BeautifulSoup
# import time
import datetime


class FB_Post:
    ###############################################################
    # FB_Post - Class                                             #
    #                                                             #
    # Description:                                                #
    #   Facebook post data and methods                            #
    #   Used for collecting data from a specific facebook post    #
    #                                                             #
    # Inputs:                                                     #
    #   post_url - the url of the post to collect data from       #
    #   driver   - webdriver from fb_user class                   #
    ###############################################################

    def __init__(self, post_url, driver):

        # Class initialization function

        self.post_url = post_url
        self.driver = driver
        self.soup_list = []
        self.soup = ''

        #self.description = ''
        self.brand = ''
        #self.date = ''
        self.likes = 0
        self.shares = 0
        #self.comments = 0
        #self.image_url = ''

    def create_soup(self):

        # Creates a BeautifulSoup object for parsing the HTML page

        self.driver.get("https://www.facebook.com" + self.post_url)
        self.soup = BeautifulSoup(self.driver.page_source, 'lxml')

    def collect_post(self):

        # Parses the soup object and page_source for data

        likes = self.soup.find('div', {"class": "_1g06"})
        # String parsing to find reactions number -- may have to change later but works for now
        likes = str(likes)
        likes = likes.split(">",1)[1]
        self.likes = likes.split("<",1)[0]

        #self.likes = likes.find('div').text.replace(',', '')
        brand = self.soup.find('strong', {"class": "actor"})#.get('href').replace('/', '')
        brand = str(brand)
        brand = brand.split(">",1)[1]
        self.brand = brand.split("<",1)[0]

        shares = self.soup.find('span', {"data-sigil": "feed-ufi-sharers"})

        shares = str(shares)
        shares = shares.split(">", 1)[1]
        self.shares = shares.split("<", 1)[0]

        description = self.soup({"title"})
        description = str(description)
        description = description.split("-", 1)[1]
        description = description.split("|", 1)[0]
        self.description = description


        #date = self.soup.find('a', {"class": "c-Yi7"}).find('time').get('datetime')
        #self.date = date[0:date.rfind('T')]
        #, "short", "forceseconds
        date = self.soup({"abbr": "data-store"}) #= {"time""}
        date = str(date)
        date = date.split(":", 1)[1]
        date = date.split(",", 1)[0]
        date = datetime.datetime.fromtimestamp(int(date))

        self.date = date

        #self.comments = self.soup.find('a', {"class": "r8ZrO"}).find('span').text
        #self.description = self.soup.find('div', {"class": "QzzMF Igw0E IwRSH eGOV_ vwCYk"}).find('span').find('span').text
        #image_pre_parse = self.soup.findAll('img')
        #self.image_url = image_pre_parse[1].get('src')

    def print(self):

        # Prints the data collected from the facebook post

        print("Brand: ", self.brand)
        print("Description: ", self.description)
        print("Date: ", self.date)
        print("Likes: ", self.likes)
        print("Shares: ", self.shares)
        #print("Comments: ", self.comments)
        #print("Image URL: ", self.image_url)
        print("Post URL: facebook.com", self.post_url)
        print("\n\n")