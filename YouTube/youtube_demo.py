from bs4 import BeautifulSoup
import requests
import time
import threading


def printResults(dict, duration):
    for item in dict:
        print(item,": ", dict[item])
    print(duration, " seconds")


def parseYTvideo():
    url = 'https://www.youtube.com/watch?v=KNb_MoqxA5o&ab_channel=Chubbyemu'
    content = requests.get(url).text
    soup = BeautifulSoup(content, 'lxml')
    metaData = soup.findAll("div")[0]
    titleAndChannel = metaData.findAll(itemprop="name")
    title = titleAndChannel[0].get('content')
    channel = titleAndChannel[1].get('content')
    description = metaData.find(itemprop="description").get('content')
    viewCount = metaData.find(itemprop="interactionCount").get('content')
    link = metaData.find(itemprop="url").get('href')
    thumbnailUrl = metaData.find(itemprop="thumbnailUrl").get('href')
    datePublished = metaData.find(itemprop="datePublished").get('content')
    likesPreParse = content[:content.rfind(' likes"')]
    likes = likesPreParse[likesPreParse.rfind('"')+1:].replace(',', "")
    dislikesPreParse = content[:content.rfind(' dislikes"')]
    dislikes = dislikesPreParse[dislikesPreParse.rfind('"')+1:].replace(',', "")

    dict = {'Title': title,
            'Channel': channel,
            'Description': description,
            'Views': viewCount,
            'Date': datePublished,
            'Likes': likes,
            'Dislikes': dislikes,
            'Link': link,
            'Thumbnail': thumbnailUrl}
    return dict


def temp():
    for i in range(10):
        parseYTvideo()


start = time.time()

threads = list()

for i in range(10):
    x = threading.Thread(target=temp)
    threads.append(x)
    x.start()

for index, thread in enumerate(threads):
    thread.join()

end = time.time()

printResults(parseYTvideo(), end-start)
