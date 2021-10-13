from bs4 import BeautifulSoup

import insta_user
import random
import time


def create_soup_list(url_list, driver):
    # save the source of all the posts we want

    # return the saved page sources

    #url_list = url_list[:3]
    soup_list = []
    for url in url_list:
        driver.get("https://www.instagram.com" + url)
        soup = BeautifulSoup(driver.page_source, 'lxml')
        soup_list.append(soup)
        rand = random.randrange(30, 35)
        time.sleep(rand)

    return soup_list


def scrape_posts(soup_list):

    # collect the data from the saved page sources
    parsed_list = []
    for soup in soup_list:

        likes = soup.find('a', {"class": "zV_Nj"})
        if likes is None:
            likes = soup.find('span', {"class": "vcOH2"})

        likes = likes.find('span').text.replace(',', '')

        account = soup.find('a', {"class": "sqdOP yWX7d _8A5w5 ZIAjV"}).get('href').replace('/', '')
        date = soup.find('a', {"class": "c-Yi7"}).find('time').get('datetime')
        date = date[0:date.rfind('T')]
        comments = soup.find('a', {"class": "r8ZrO"}).find('span').text
        description = soup.find('div', {"class": "QzzMF Igw0E IwRSH eGOV_ vwCYk"}).find('span').find('span').text
        image_pre_parse = soup.findAll('img')
        image_url = image_pre_parse[1].get('src')

        output_dict = {'Brand': account,
                       'Description': description,
                       'Likes': likes,
                       'Date': date,
                       'Comments': comments,
                       'Image_URL': image_url}

        print(output_dict)
        parsed_list.append(output_dict)

    return parsed_list


def run(account_name):
    driver = insta_user.launch_webdriver()
    url_list = insta_user.retrieve_urls(account_name, driver)
    soup_list = create_soup_list(url_list, driver)
    return scrape_posts(soup_list)


def print_soup(parsed_list):
    for item in parsed_list:
        print(item)
