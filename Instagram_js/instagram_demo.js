const puppeteer = require('puppeteer');

//need to scrape likes, number of comments, date, and attached image

(async function main() 
{
	try 
	{
		//@NOTE(P): Must be run in incognito while emulating mobile, redirects to login page otherwise.
		const browser = await puppeteer.launch(
		{
			args: 
			[
				'--incognito',
			],
		});
		
		const devices = puppeteer.devices;
		const iPhone = devices['iPhone 6'];
		const [page] = await browser.pages();
		await page.emulate(iPhone);
		
		var url = 'https://www.instagram.com/oreo/';
		
		await page.goto(url, { waitUntil: 'networkidle0' });
		const data = await page.evaluate(() => document.querySelector('*').outerHTML);
		
		//@NOTE(P):Regular Expressions
		var account_post_exp = /<div class="v1Nh3 kIKUG  _bz0w"><a href="\/p\/.{11}\/"/g;
		var post_likes_exp = /[\d,]*(?=<\/span> likes<\/a><\/div>)/;
		var post_comments_exp = /f/;
		var post_date_exp = /<time class=".*" datetime="(.*)" title=".*">.*\/time>/;
		var post_img_exp = /f/;
		
		const results = [];
		
		//@NOTE(P): Match posts on account page to css class.
		var posts = data.match(account_post_exp);
		
		console.log("Analyzing Instagram account:\n" + url);
		
		//@NOTE(P): Iterate through posts gathered.
		for (let i = 0; i < posts.length; i++) 
		{	
			//Get URL
			posts[i] = posts[i].slice(41, 56);
			console.log(posts[i]);
			
			await page.goto('https://www.instagram.com' + posts[i], { waitUntil: 'networkidle0' });
			const post_data = await page.evaluate(() => document.querySelector('*').outerHTML);
			
			//Get Likes
			var temp_likes = post_data.match(post_likes_exp);
			if(temp_likes != null)
			{
				var likes = parseInt(temp_likes.toString().replace(/,/g, ''), 10);
			}
			else
			{
				var likes = -1;
			}
			
			//Get # of Comments
			//@NOTE(P):Todo. Not sure if this information is located anywhere on the page.
			
			//Get Date
			var temp_date = post_data.match(post_date_exp);
			if(temp_date != null)
			{
				var date = temp_date[1].toString().slice(0, 19);
			}
			else
			{
				var date = -1;
			}
			
			
			//Get Img
			//@NOTE(P):Todo. Instagram doesn't like you scraping the image, may have to do something different from previous methods.
			
			//Push to Array of Results
			const scrape_obj = 
			{
				url:'https://www.instagram.com' + posts[i], 
				likes:likes,
				//comments:comments,
				date:date//,
				//img:img
				//
			};
			results.push(scrape_obj);
		} 
		await browser.close();
		
		console.log(results);
	} 
	catch (err) 
	{
		console.error(err);
	}
})();