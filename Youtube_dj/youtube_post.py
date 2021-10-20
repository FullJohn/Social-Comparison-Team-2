from bs4 import BeautifulSoup

import youtube_channel
import random
import time


class Post:

    def __init__(self, url, driver):
        self.driver = driver
        self.url = url
        self.title = ''
        self.description = ''
        self.thumbnail = ''
        self.date = ''
        self.views = 0
        self.comments = 0
        self.likes = 0
        self.dislikes = 0

    def scrape_post(self):
        self.driver.get(self.url)
        soup = BeautifulSoup(self.driver.page_source, 'lxml')
        meta_data = soup.findAll('div')[0]
        print(meta_data[0])


