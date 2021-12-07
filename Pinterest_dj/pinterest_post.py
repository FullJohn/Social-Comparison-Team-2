import time
import datetime
import re

from bs4 import BeautifulSoup

class PinterestPost:
    ###############################################################
    # PinterestPost - Class                                       #
    #                                                             #
    # Description:                                                #
    #   Pinterest post data and methods                           #
    #   Used for parsing the data from a specific Pinterest post  #
    #                                                             #
    # Inputs:                                                     #
    #   url - url scraped from the pinterest users page           #
    #   brand_name - account brand name                           #
    #   post_html - post html from beautiful soup library         #
    #                                                             #
    # Pierce Hopkins                                              #
    ###############################################################

    def __init__(self, url, brand_name, post_html):
        # Class initialization function
        self.post_url = "https://www.pinterest.com/" + url
        self.brand = brand_name
        self.post_html = post_html
        self.description = ''
        self.emojis = -1
        self.comments = -1
        self.date = ''
        self.image_url = ''

    def scrape_post(self):
        #@TODO(P): Parse post text if it exists
        #data-test-id="CloseupDescriptionContainer"
        post_desc = self.post_html.find("img", { "data-test-id" : "CloseupDescriptionContainer" })
        if post_desc != None:
            self.description = post_desc.get_text()
        else:
            self.description = "{None}"
        
        #@NOTE(P): Parse emojis if they exist
        #data-test-id="Reaction"
        post_emojis = self.post_html.find("img", { "data-test-id" : "Reaction" })
        if post_emojis != None:
            print(post_emojis)
            self.emojis = int(post_emojis.get_text())
        else:
            self.emojis = 0
        
        #@NOTE(P): Parse # of comments if they exist
        #<h3 class="lH1 dyH iFc mWe kON pBj zDA IZT">31 comments</h3>
        match = re.search("<h3 class=\"lH1 dyH iFc mWe kON pBj zDA IZT\">(\d+) comments</h3>", str(self.post_html))
        if match != None:
            print(match.group(1))
            self.comments = int(match.group(1))  
        else:
            self.comments = 0
        
        
        #@NOTE(P):Scrape the date. Pinterest does not publically provide the post date so this is the closest approximation.
        match = re.search("_board_thumbnail_(\d\d\d\d-\d\d-\d\d-\d\d-\d\d-\d\d)", str(self.post_html))
        if match != None:
            self.date = datetime.datetime.strptime(match.group(1), "%Y-%m-%d-%H-%M-%S")  
        else:
            self.date = "{Error}"
        
        #NOTE(P): Parse the image 
        post_img_elements = self.post_html.find("img", { "class" : "hCL kVc L4E MIw" }).attrs['src']
        self.image_url = post_img_elements
        

    def print(self):
        # Prints the data from the post
        print("Brand:\t\t", self.brand)
        print("Post URL:\t", self.post_url)
        print("Description:\t", self.description)
        print("Date:\t\t", self.date)
        print("Emojis:\t\t", self.emojis)
        print("Comments:\t", self.comments)
        print("Image URL:\t", self.image_url)
        print("\n\n")