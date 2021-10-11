import insta_post

account_name = 'oreo'

parsed_list = insta_post.run(account_name)

insta_post.print_soup(parsed_list)
