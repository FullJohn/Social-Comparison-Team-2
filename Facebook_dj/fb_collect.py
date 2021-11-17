import fb_user

brandname = input("Enter a brand name: ")
daterange = int(input("Enter date range (past days from present): "))

print('Beginning data retrieval...')
collect = fb_user.FB_User(brandname, 0)

collect.login()
collect.retrieve_urls()
collect.collect_user_posts(daterange)