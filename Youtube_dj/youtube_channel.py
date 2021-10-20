import selenium.webdriver as webdriver
from bs4 import BeautifulSoup
import youtube_post

class Channel:

    def __init__(self, channel_name):

        options = webdriver.ChromeOptions()
        options.add_argument('--incognito')
        self.webdriver = webdriver.Chrome(options=options)
        self.channel_name = channel_name
        titles = []
        views = []
        urls = []
        self.videos = [urls, titles, views]
        self.url_list = []
        post = youtube_post.Post
        self.posts = []

    def retrieve_urls(self):
        try:
            self.webdriver.get('https://www.youtube.com/c/' + self.channel_name + '/videos')

        except(self.webdriver.title == '404 Not Found'):
            pass

        try:
            self.webdriver.get('https://www.youtube.com/user/' + self.channel_name + '/videos')

        except(self.webdriver.title == '404 Not Found'):
            pass

        soup = BeautifulSoup(self.webdriver.page_source, 'lxml')

        videos = soup.findAll('a', id='video-title')
        urls = []
        titles = []
        views = []

        for video in videos:
            urls.append(video.get('href'))
            titles.append(video.get('title'))
            view = video.get('aria-label')
            view = view[view.rfind('seconds '):]
            view = view.replace('seconds', '')
            view = view.replace(' views', '')
            view = view.replace(',', '')
            view = int(view.replace(' ', ''))
            views.append(view)

        vids = [urls, titles, views]
        base_url = 'https://www.youtube.com'
        for i in range(len(vids[0])):
            if vids[1][i] in self.videos[1]:
                index = self.videos[1].index(vids[1][i])
                if vids[2][i] > self.videos[2][index]:
                    self.videos[0][index] = base_url + vids[0][i]
                    self.videos[1][index] = vids[1][i]
                    self.videos[2][index] = vids[2][i]

            else:
                self.videos[0].append(base_url + vids[0][i])
                self.videos[1].append(vids[1][i])
                self.videos[2].append(vids[2][i])

        self.url_list = self.videos[0]

    def create_posts(self):

        for i in self.url_list:
            post = youtube_post.Post(i, self.webdriver)
            self.posts.append(post)

    def scrape_posts(self):
        for post in self.posts:
            post.scrape_post()
