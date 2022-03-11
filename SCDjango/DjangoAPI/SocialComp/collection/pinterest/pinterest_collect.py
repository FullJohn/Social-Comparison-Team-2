import sys
from . import pinterest_user
from . import pinterest_post
import datetime

#from multiprocessing import Pool


def run_pinterest_collect(brands, date_range, query_id):

    date_range = pre_collect(date_range)

    if date_range[0] > date_range[1]:
        date_range.reverse()
    
    #agents = 3
    #chunksize = 3
    #with Pool(processes = agents) as pool:
    #    pool.map(pinterest_user.PinterestUser, dataset)
    for brand_name in brands:
        pinterest_user.PinterestUser(brand_name, date_range, query_id)


def pre_collect(date_range):
    
    date1 = [date_range[0].split('T')[0]][0]
    date2 = [date_range[1].split('T')[0]][0]
    date1 = date1.split('-')
    date2 = date2.split('-')
    date1 = datetime.date(int(date1[0]), int(date1[1]), int(date1[2]))
    date2 = datetime.date(int(date2[0]), int(date2[1]), int(date2[2]))
    return [date1, date2]