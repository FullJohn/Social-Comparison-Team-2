import insta_post
import insta_user

account_name = 'pringles'
parsed_list = insta_post.run(account_name)
insta_post.print_soup(parsed_list)


#list = ['/p/CUfKdrwAcoG/']

#driver = insta_user.launch_webdriver()

#soup_list = insta_post.create_soup_list(list, driver)

#parsed_list = insta_post.scrape_posts(soup_list)

#insta_post.print_soup(parsed_list)
