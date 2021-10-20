import random
import time

import selenium.webdriver as webdriver
from bs4 import BeautifulSoup
import insta_post


class InstaUser:

    def __init__(self, brand_name, date_range):

        # Webdriver Options
        mobile_emulation = {"deviceName": "Nexus 5"}
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--incognito')
        options.add_experimental_option('mobileEmulation', mobile_emulation)

        self.driver = webdriver.Chrome(options=options)
        self.brand_name = brand_name
        self.date_range = date_range
        self.url_list = []

        self.posts = []

    def retrieve_urls(self):
        account_url = "https://www.instagram.com/" + self.brand_name + "/"

        self.driver.get(account_url)
        soup = BeautifulSoup(self.driver.page_source, 'lxml')
        divs = soup.findAll('div', {"class": "v1Nh3 kIKUG _bz0w"})

        for item in divs:
            self.url_list.append(item.find('a').get('href'))

    def scrape_user_posts(self):

        for url in self.url_list:
            post = insta_post.InstaPost(url, self.driver)
            post.create_soup()
            post.scrape_post()
            post.print()
            delay = random.randrange(30, 60)
            time.sleep(delay)
