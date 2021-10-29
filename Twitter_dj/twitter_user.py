import random
import time

import selenium.webdriver as webdriver
from bs4 import BeautifulSoup
import twitter_post


class TwitterUser:
    #################################################################
    # TwitterUser - Class                                           #
    #                                                               #
    # Description:                                                  #
    #   Class for an TwitterUser user                               #
    #   Used for collecting data from Twitter                       #
    #   posts from a specific class.                                #
    #                                                               #
    # Inputs:                                                       #
    #   brand_name - the name of the Twitter account, ie 'oreo'     #
    #   date_range - the range of dates to collect posts from       #
    #################################################################

    def __init__(self, brand_name, date_range):
        # Class initializing function

        # Webdriver Options
        mobile_emulation = {"deviceName": "Nexus 5"}
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--incognito')
        options.add_experimental_option('mobileEmulation', mobile_emulation)

        # Class variables

        self.driver = webdriver.Chrome(options=options)
        self.brand_name = brand_name
        self.date_range = date_range
        self.url_list = []

        self.posts = []

    def retrieve_urls(self):
        # Retrieve the URLs of posts that we will collect data for

        account_url = "https://twitter.com/" + self.brand_name + "/"

        self.driver.get(account_url)
        soup = BeautifulSoup(self.driver.page_source, 'lxml')
        
        #@TODO(P): Find which CSS classes need to be scraped
        divs = soup.findAll('div', {"class": "css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu"})

        for item in divs:
            self.url_list.append(item.find('a').get('href'))

    def scrape_user_posts(self):
        # Collect data from the posts collected

        for url in self.url_list:
            post = twitter_post.TwitterPost(url, self.driver)
            post.create_soup()
            post.scrape_post()
            post.print()
            delay = random.randrange(30, 60)
            time.sleep(delay)
