import random
import time

import selenium.webdriver as webdriver
from bs4 import BeautifulSoup
import fb_post


class FB_User:
    ###############################################################
    # FB_User - Class                                             #
    #                                                             #
    # Description:                                                #
    #   Class for an facebook user                                #
    #   Used for collecting data from facebook                    #
    #   posts from a specific user.                               #
    #                                                             #
    # Inputs:                                                     #
    #   brand_name - the name of the facebook account, ie 'oreo'  #
    #   date_range - the range of dates to collect posts from     #
    ###############################################################

    def __init__(self, brand_name, date_range):
        # Class initializing function

        # Webdriver Options
        mobile_emulation = {"deviceName": "Nexus 5"}

        options = webdriver.ChromeOptions()
        # options.add_argument('--headless')

        options.add_argument('--incognito')
        options.add_experimental_option('mobileEmulation', mobile_emulation)

        # Class variables

        self.driver = webdriver.Chrome(options=options)
        self.brand_name = brand_name
        self.date_range = date_range
        self.url_list = []

        self.posts = []

    def login(self):
        # email = input("Enter email: ")
        # password = input("Enter password: ")
        email = "throwawayfb103099@gmail.com"
        password = "TestFB123"
        self.driver.get('https://www.facebook.com/')
        username_box = self.driver.find_element_by_id('m_login_email')
        # username_box = self.driver.find_element_by_name('username')
        username_box.send_keys(email)
        time.sleep(1)

        password_box = self.driver.find_element_by_id('m_login_password')
        # password_box = self.driver.find_element_by_name('password')
        password_box.send_keys(password)
        time.sleep(1)

        login_box = self.driver.find_element_by_name('login')
        login_box.click()
        time.sleep(5)

        # self.driver.quit()

    def retrieve_urls(self):
        # Retrieve the URLs of posts that we will collect data for

        account_url = "https://www.facebook.com/" + self.brand_name + "/"

        self.driver.get(account_url)

        SCROLL_PAUSE_TIME = 0.5

        # Get scroll height
        last_height = self.driver.execute_script("return document.body.scrollHeight")

        while True:
            # Scroll down to bottom
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

            # Wait to load page
            time.sleep(SCROLL_PAUSE_TIME)

            # Calculate new scroll height and compare with last scroll height
            new_height = self.driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height

        time.sleep(5)
        soup = BeautifulSoup(self.driver.page_source, 'lxml')
        divs = soup.findAll('div', {"class": "_5uso _5t8z"})

        for item in divs:
            self.url_list.append(item.find('a').get('href'))

    def collect_user_posts(self, daterange):
        # time.sleep(10)

        # Collect data from the posts collected

        for url in self.url_list:
            post = fb_post.FB_Post(url, self.driver)
            post.create_soup()
            post.collect_post()
            post.print()
            delay = random.randrange(30, 60)
            time.sleep(delay)