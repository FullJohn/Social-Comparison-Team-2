from bs4 import BeautifulSoup

import insta_user


def create_soup_list(page_sources):

    soup_list = []

    for page in page_sources:
        soup = BeautifulSoup(page, 'lxml')
        soup_list.append(soup)

    return soup_list


def scrape_posts(soup_list):

    # collect the data from the saved page sources
    parsed_list = []
    for soup in soup_list:
        meta = soup.findAll('div')

        likes = meta[34].find('span').text.replace(',', '')
        account = meta[10].find('a').get('href').replace('/', '')
        date = meta[0].find('time').get('datetime')
        date = date[:date.rfind('T')]
        image_pre_parse = soup.findAll('img')
        image_url = image_pre_parse[1].get('src')
        output_dict = {'Brand': account,
                       'Likes': likes,
                       'Date': date,
                       'Image_URL': image_url}

        parsed_list.append(output_dict)

    return parsed_list


def run(account_name):
    driver = insta_user.launch_webdriver()
    url_list = insta_user.retrieve_urls(account_name, driver)
    page_sources = insta_user.collect_post_raw(url_list, driver)
    soup_list = create_soup_list(page_sources)
    return scrape_posts(soup_list)


def print_soup(parsed_list):
    for item in parsed_list:
        print(item)
