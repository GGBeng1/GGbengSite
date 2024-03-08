import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { parse, isBefore } from 'date-fns';
const posts = await pagesGlobToRssItems(import.meta.glob('./blog/posts/*.md'));
const items = posts.sort((a, b) => {
		if (isBefore(a.pubDate, b.pubDate)) return 1;
		if (isBefore(b.pubDate, a.pubDate)) return -1;
		return 0;
	});
export const GET = context =>
	rss({
		title: 'GGbeng’s Blog',
		description: '记录生活和工作的blog',
		site: context.site,
		items,
	});
