import youtube_channel
import youtube_post

options = youtube_channel.webdriver.ChromeOptions()
options.add_argument('--incognito')
driver = youtube_channel.webdriver.Chrome(options=options)

post = youtube_post.Post('https://www.youtube.com/watch?v=kLtsXa_ElA0', driver)
post.scrape_post()


