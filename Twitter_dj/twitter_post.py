import time
import datetime
import re

from bs4 import BeautifulSoup

class TwitterPost:
    ###############################################################
    # TwitterPost - Class                                         #
    #                                                             #
    # Description:                                                #
    #   Twitter post data and methods                             #
    #   Used for parsing the data from a specific Twitter post    #
    #                                                             #
    # Inputs:                                                     #
    #   div - div scraped from the twitter users page             #
    ###############################################################

    def __init__(self, div, brand_name):
        # Class initialization function
        self.post_html = div
        
        self.post_url = ''
        self.brand = brand_name
        self.description = ''
        self.likes = -1
        self.retweets = -1
        self.date = ''
        self.comments = -1
        self.image_url = ''

    def scrape_post(self):
        #@NOTE(P): Parse Post URL
        #a
        #css-4rbku5 css-18t94o4 css-901oao r-14j79pv r-1loqt21 r-1q142lx r-1qd0xha r-1b43r93 r-16dba41 r-hjklzo r-bcqeeo r-3s2u2q r-qvutc0
        post_url = self.post_html.find("a", class_="css-4rbku5 css-18t94o4 css-901oao r-14j79pv r-1loqt21 r-1q142lx r-1qd0xha r-1b43r93 r-16dba41 r-hjklzo r-bcqeeo r-3s2u2q r-qvutc0")
        self.post_url = "www.twitter.com" + post_url['href']
        
        #@TODO(P): Parse post text if it exists
        #span
        #css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0
        #post_desc = self.post_html.find("div", { "lang" : "en" }).getText()
        #self.description = post_desc
        
        #@NOTE(P): Parse likes
        #div
        #css-18t94o4 css-1dbjc4n r-1777fci r-3vrnjh r-1ny4l3l r-bztko3 r-lrvibr
        likes = self.post_html.find("div", { "data-testid" : "like" }).attrs['aria-label']
        p = re.search(r"(\d+) Likes. Like", likes)
        self.likes = int(p.group(1))
        
        #@NOTE(P): Parse retweets
        #div
        #css-18t94o4 css-1dbjc4n r-1777fci r-3vrnjh r-1ny4l3l r-bztko3 r-lrvibr
        retweets = self.post_html.find("div", { "data-testid" : "retweet" }).attrs['aria-label']
        p = re.search(r"(\d+) Retweets. Retweet", retweets)
        self.retweets = int(p.group(1))
        
        #@NOTE(P):Scrape the date
        #time
        time_posted = self.post_html.find("time")
        #@NOTE(P): Twitter datetime example: 2021-09-27T18:26:32.000Z 
        self.date = datetime.datetime.strptime(time_posted.attrs['datetime'], "%Y-%m-%dT%H:%M:%S.000Z")
        
        #@NOTE(P): Parse comments
        #div
        #css-18t94o4 css-1dbjc4n r-1777fci r-3vrnjh r-1ny4l3l r-bztko3 r-lrvibr
        comments = self.post_html.find("div", { "data-testid" : "reply" }).attrs['aria-label']
        p = re.search(r"(\d+) Replies. Reply", comments)
        self.comments = int(p.group(1))
        
        #TODO(P): Parse the image if it exists
        #div(?)
        #css-1dbjc4n r-1p0dtai r-1mlwlqe r-1d2f490 r-11wrixw r-1mnahxq r-1udh08x r-u8s1d r-zchlnj r-ipm5af r-417010
        #image_pre_parse = self.soup.findAll('img')
        #self.image_url = image_pre_parse[1].get('src')
        

    def print(self):
        # Prints the data from the post
        print("Brand:\t\t", self.brand)
        print("Post URL:\t", self.post_url)
        print("Description:\t", self.description)
        print("Date:\t\t", self.date)
        print("Likes:\t\t", self.likes)
        print("Retweets:\t", self.retweets)
        print("Comments:\t", self.comments)
        print("Image URL:\t", self.image_url)
        print("\n\n")