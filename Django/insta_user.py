import selenium.webdriver as webdriver
from bs4 import BeautifulSoup


def launch_webdriver():
    # Creates and returns our webdriver

    mobile_emulation = {"deviceName": "Nexus 5"}

    options = webdriver.ChromeOptions()

    options.add_experimental_option('mobileEmulation', mobile_emulation)

    return webdriver.Chrome(options=options)


def retrieve_urls(account_name, driver):

    # collect the urls for the posts we want to scrape

    account_url = "https://www.instagram.com/" + account_name + '/'

    driver.get(account_url)

    soup = BeautifulSoup(driver.page_source, 'lxml')

    divs = soup.findAll('div', {"class": "v1Nh3 kIKUG _bz0w"})

    # collect the urls for the posts we want to scrape

    url_list = []
    for item in divs:
        url_list.append(item.find('a').get('href'))

    print("Printing list of URLS retrieved: ")

    for item in url_list:
        print(item)

    # return a list of the urls
    return url_list
