import twitter_user
import time
import datetime

firstDate =  datetime.datetime.now() - datetime.timedelta(30)
lastDate  =  datetime.datetime.now()

print('Beginning data retrieval...')
brand = twitter_user.TwitterUser('Oreo', firstDate, lastDate)

brand.retrieve_posts()
brand.parse_divs()
