import twitter_user


print('Beginning data retrieval...')
oreo = twitter_user.TwitterUser('oreo', 30)

oreo.retrieve_posts()
oreo.parse_divs()
