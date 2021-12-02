import sys
import youtube_channel
import youtube_post
import datetime


def run_youtube_collect(brands, date_range):

    if date_range[0] > date_range[1]:
        date_range.reverse()

    for brand in brands:
        youtube_channel.YouTubeChannel(brand, date_range)


def main():
    brands = ['oreo', 'pringles', 'pepsi']
    date1 = '2021-07-01'
    date2 = '2021-09-30'

    date1 = date1.split('-')
    date2 = date2.split('-')
    date1 = datetime.date(int(date1[0]), int(date1[1]), int(date1[2]))
    date2 = datetime.date(int(date2[0]), int(date2[1]), int(date2[2]))
    date_range = [date1, date2]
    run_youtube_collect(brands, date_range)



    #args = sys.argv[1:]
    #for item in args:
    #    print(item)
    #brand = args[1]
    #year = int(args[2])
    #month = int(args[3])
    #day = int(args[4])
    #date = datetime.date(year, month, day)

    #channel = youtube_channel.YouTubeChannel(brand, date)
    #channel.retrieve_post_urls()
    #channel.create_posts()
    #channel.collect_posts()
    #channel.print_posts()


if __name__ == "__main__":
    main()
