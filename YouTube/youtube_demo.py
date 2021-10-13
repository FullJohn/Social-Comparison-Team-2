from bs4 import BeautifulSoup
import requests
import time
import threading


def print_results(output_dict, duration):
    for item in output_dict:
        print(item, ": ", output_dict[item])
    print(duration, " seconds")


def parse_yt_video(url):
    #url = 'https://www.youtube.com/watch?v=KNb_MoqxA5o&ab_channel=Chubbyemu'
    content = requests.get(url).text
    soup = BeautifulSoup(content, 'lxml')
    meta_data = soup.findAll("div")[0]
    title_and_channel = meta_data.findAll(itemprop="name")
    title = title_and_channel[0].get('content')
    channel = title_and_channel[1].get('content')
    description = meta_data.find(itemprop="description").get('content')
    view_count = meta_data.find(itemprop="interactionCount").get('content')
    link = meta_data.find(itemprop="url").get('href')
    thumbnail_url = meta_data.find(itemprop="thumbnailUrl").get('href')
    date_published = meta_data.find(itemprop="datePublished").get('content')
    likes_pre_parse = content[:content.rfind(' likes"')]
    likes_count = likes_pre_parse[likes_pre_parse.rfind('"') + 1:].replace(',', "")
    dislikes_pre_parse = content[:content.rfind(' dislikes"')]
    dislikes_count = dislikes_pre_parse[dislikes_pre_parse.rfind('"') + 1:].replace(',', "")

    output_dict = {'Title': title,
                   'Channel': channel,
                   'Description': description,
                   'Views': view_count,
                   'Date': date_published,
                   'Likes': likes_count,
                   'Dislikes': dislikes_count,
                   'Link': link,
                   'Thumbnail': thumbnail_url}

    return output_dict


def threading_demo():
    for j in range(10):
        parse_yt_video('https://www.youtube.com/watch?v=fXW-QjBsruE&ab_channel=Vsauce')


def main():
    start = time.time()
    threads = list()
    print("Beginning threads...")
    for i in range(10):
        x = threading.Thread(target=threading_demo)
        threads.append(x)
        x.start()

    for index, thread in enumerate(threads):
        thread.join()

    end = time.time()

    print_results(parse_yt_video('https://www.youtube.com/watch?v=fXW-QjBsruE&ab_channel=Vsauce'), end - start)


def single_demo():
    start = time.time()
    output_dict = parse_yt_video('https://www.youtube.com/watch?v=fXW-QjBsruE&ab_channel=Vsauce')
    end = time.time()
    print_results(output_dict, end - start)


if __name__ == "__main__":
    #single_demo()
    main()
