import random
import time
import datetime
import re

import selenium.webdriver as webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import TimeoutException

from bs4 import BeautifulSoup
from . import pinterest_post
#import pinterest_post

class PinterestUser:
    #################################################################
    # PinterestUser - Class                                         #
    #                                                               #
    # Description:                                                  #
    #   Class for an PinterestUser user                             #
    #   Used for collecting data from pinterest                     #
    #   posts from a specific class.                                #
    #                                                               #
    # Inputs:                                                       #
    #   brand_name - the name of the Pinterest account, ie 'oreo'   #
    #   date_range - the range of dates to collect posts from       #
    #                                                               #
    # Pierce Hopkins                                                #
    #################################################################

    def __init__(self, brand_name,  date_range, query_id):
        # Class initializing function

        # Webdriver Options
        mobile_emulation = {"deviceName": "Nexus 5"}
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--incognito')
        options.add_experimental_option('mobileEmulation', mobile_emulation)
        
        # Class variables
        self.driver = webdriver.Chrome(options=options)
        self.driver.set_page_load_timeout(30)
        self.brand_name = brand_name
        self.firstDate = date_range[0]
        self.lastDate = date_range[1]
        
        self.followers = ''
        
        self.posts = []
        
        self.query_id = query_id
        self.retrieve_posts()
        

    def retrieve_posts(self):
        account_url = "https://www.pinterest.com/" + self.brand_name + "/_created"
        
        try:
            self.driver.get("https://www.pinterest.com/login/")
        except:
            print("Exception has been thrown.")
        
        
        time.sleep(random.randint(5, 10))
        
        email = self.driver.find_element_by_id("email")
        password = self.driver.find_element_by_id("password")
        #@NOTE(P): May not want to hardcode this..
        email.send_keys("prhopkins98@gmail.com")
        time.sleep(1)
        password.send_keys("SocialComp2")
        time.sleep(1)
        actions = ActionChains(self.driver) 
        actions.send_keys(Keys.TAB * 3)
        actions.send_keys(Keys.ENTER)
        actions.perform()
        
        time.sleep(5)
        
        try:
            self.driver.get(account_url)
        except:
            print("Exception has been thrown.")
        
        
        time.sleep(random.randint(5, 10))
        
        #@NOTE(P): get followers
        #data-test-id="profile-followers-link"
        soup = BeautifulSoup(self.driver.page_source, 'lxml')
        temp_followers = soup.find("div", { "data-test-id" : "profile-followers-link" })
        if temp_followers != None:
            self.followers = temp_followers.get_text()
        else:
            self.followers = "{Error}"

        print("Gathering all posts between: " + self.firstDate.strftime("%b %d") + " and " + self.lastDate.strftime("%b %d"))
        
        post_urls = []
        scroll_pause_time = 5
        screen_height = self.driver.execute_script("return window.screen.height;")
        i = 1
        scrolling = True
        last_height = self.driver.execute_script("return document.body.scrollHeight")
        
        while True:
            soup = BeautifulSoup(self.driver.page_source, 'lxml')
            
            #Collect links
            for a in soup.find_all('a', href=True):
                temp = a['href']
                match = re.search("\/pin\/\d*", temp)
                if match != None:
                    if temp not in post_urls:
                        post_urls.append(temp)
            
            #@NOTE(P): Scroll until the bottom of the page is reached
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            
            time.sleep(scroll_pause_time)
            
            new_height = self.driver.execute_script("return document.body.scrollHeight")
            
            if new_height == last_height:
                break
            last_height = new_height
        
        post_cnt = 0
        
        for post_url in post_urls:
            try:
                #get_with_retry(self.driver, "https://www.pinterest.com" + post_url)
                self.driver.get("https://www.pinterest.com" + post_url)
                time.sleep(random.randint(3, 6))
                soup = BeautifulSoup(self.driver.page_source, 'lxml')
                post = pinterest_post.PinterestPost(post_url, self.brand_name, soup)
                post.followers = self.followers
                post.scrape_post()
                post.print()
                #@NOTE(P): Temporary measure
                #@TODO(P): Refactor code to be faster using multithreading. Initial version didn't work on live site.
                #--------- Will require more work to do appropriately. Just grab some posts for now.
                post_cnt += 1
                self.posts.append(post)
                post.save_post(self.query_id)
                
                if post.date.date() < self.firstDate or post.date.date() > self.lastDate:
                    if post in self.posts:
                        print("Post not in date_range")
                        #self.posts.remove(post)  
                        #post_cnt += 1
                #else:
                    #self.posts.append(post)
                    #post.save_post(self.query_id)
                    #post_cnt = 0
                
                if post_cnt == 30:
                    break
                
                time.sleep(random.randint(3, 6))
                
            except TimeoutException as ex:
                print("Exception has been thrown. " + str(ex))
                print("... moving to next item ...")
                self.driver.back()
                continue
            
            
        self.driver.quit()
