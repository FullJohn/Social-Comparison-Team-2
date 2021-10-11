import random
import sys
import requests
import json
from bs4 import BeautifulSoup
import selenium.webdriver as webdriver


mobile_emulation = {"deviceName": "Nexus 5"}

options = webdriver.ChromeOptions()


# Mobile browser likely not necessary
# I am unsure about when it prevents login redirects so I'm leaving this in
# until we know for sure that we don't need it
options.add_experimental_option('mobileEmulation', mobile_emulation)

driver = webdriver.Chrome(options=options)

url = "https://www.instagram.com/p/CU5IgpMlLAJ/"
driver.get(url)
soup = BeautifulSoup(driver.page_source, 'lxml')
meta = soup.findAll('div')

likes = meta[34].find('span').text.replace(',', '')
account = meta[10].find('a').get('href').replace('/','')
date = meta[0].find('time').get('datetime')
date = date[:date.rfind('T')]
image_pre_parse = soup.findAll('img')
image_url = image_pre_parse[1].get('src')
output_dict = {'Brand': account,
               'Likes': likes,
               'Date': date,
               'Image_URL': image_url}
for item in output_dict:
    print(item, ": ", output_dict[item])
