import pinterest_user
import time
import datetime


firstDate =  datetime.datetime.now() - datetime.timedelta(30)
lastDate  =  datetime.datetime.now()


print('Beginning data retrieval...')
oreo = pinterest_user.PinterestUser('oreo', firstDate, lastDate)

oreo.retrieve_posts()
oreo.parse_divs()
