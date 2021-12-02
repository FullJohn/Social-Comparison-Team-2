import twitter_user


print('Beginning data retrieval...')
brand = twitter_user.TwitterUser('Oreo', 15)

brand.retrieve_posts()
brand.parse_divs()
