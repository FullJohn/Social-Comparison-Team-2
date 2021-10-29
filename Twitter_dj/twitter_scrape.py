import twitter_user


print('Beginning data retrieval...')
oreo = twitter_user.TwitterUsers('oreo', 0)

oreo.retrieve_urls()
oreo.scrape_user_posts()
