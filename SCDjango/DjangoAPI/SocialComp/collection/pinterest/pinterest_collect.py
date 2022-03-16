#import pinterest_user
import time
import threading
import random

import sys
from . import pinterest_user
from . import pinterest_post
import datetime


def init_brand(brand_name, date_range, query_id):
    pinterest_user.PinterestUser(brand_name, date_range, query_id)
    

def run_pinterest_collect(brands, date_range, query_id):
    start_time = time.time()

    date_range = pre_collect(date_range)

    if date_range[0] > date_range[1]:
        date_range.reverse()
    
    for brand_name in brands:
        t = threading.Thread(target=init_brand, args=(brand_name, date_range, query_id,))
        t.start()
    
    #print("--- %s seconds ---" % (time.time() - start_time))

def pre_collect(date_range):
    date1 = [date_range[0].split('T')[0]][0]
    date2 = [date_range[1].split('T')[0]][0]
    date1 = date1.split('-')
    date2 = date2.split('-')
    date1 = datetime.date(int(date1[0]), int(date1[1]), int(date1[2]))
    date2 = datetime.date(int(date2[0]), int(date2[1]), int(date2[2]))
    return [date1, date2]



#firstDate =  datetime.date.today() - datetime.timedelta(30)
#lastDate  =  datetime.date.today()
#date_range = [firstDate, lastDate]
#brands = ['oreo', 'keebler', 'chipsahoy']

#print('Beginning data retrieval...')

#run_pinterest_collect(brands, date_range, 1)

#chipsahoy = pinterest_user.PinterestUser('oreo', date_range, 1)

