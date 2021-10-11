const puppeteer = require('puppeteer');

//need to scrape likes, number of comments, date, and attached image

(async function main() 
{
	try 
	{
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
        await page.goto('https://www.instagram.com/oreo/', { waitUntil: 'networkidle0' });
        const data = await page.evaluate(() => document.querySelector('*').outerHTML);
		
		//@NOTE(P):Regular Expressions
		var account_post_exp = /<div class="v1Nh3 kIKUG  _bz0w"><a href="\/p\/.{11}\/"/g;
		var post_likes_exp = /[\d,]*(?=<\/span> likes<\/a><\/div>)/;
		var post_comments_exp = /f/;
		var post_date_exp = /f/;
		var post_img_exp = /f/;
		
		const results = [];
		
		var posts = data.match(account_post_exp);
		
		for (let i = 0; i < posts.length; i++) 
		{	
			//Get URL
			posts[i] = posts[i].slice(41, 56);
			console.log(posts[i]);
			
			await page.goto('https://www.instagram.com' + posts[i], { waitUntil: 'networkidle0' });
			const post_data = await page.evaluate(() => document.querySelector('*').outerHTML);
			
			//Get Likes
			var temp = post_data.match(post_likes_exp);
			var likes = parseInt(temp.toString().replace(/,/g, ''), 10);
			
			//Get # of Comments
			//@NOTE(P):Todo
			
			//Get Date
			//@NOTE(P):Todo
			
			//Get Img
			//@NOTE(P):Todo
			
			//Push to Array of Results
			const scrape_obj = {url:'https://www.instagram.com' + posts[i], likes:likes};
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