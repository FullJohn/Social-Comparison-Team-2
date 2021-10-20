import insta_user


print('Beginning data retrieval...')
oreo = insta_user.InstaUser('oreo', 0)

oreo.retrieve_urls()
oreo.scrape_user_posts()
