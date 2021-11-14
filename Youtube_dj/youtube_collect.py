import youtube_channel
import youtube_post
import datetime

# Sample brand name
brand = 'oreo'
# Sample date range
date = datetime.date(2021, 8, 1)

channel = youtube_channel.YouTubeChannel(brand, date)
channel.retrieve_post_urls()
channel.create_posts()
channel.collect_posts()
channel.print_posts()
