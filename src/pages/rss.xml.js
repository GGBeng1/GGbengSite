import rss from '@astrojs/rss';
import { parse, isBefore } from 'date-fns';

const postImportResult = import.meta.globEager('./blog/posts/*.md');
const posts = Object.values(postImportResult);
const items = posts
	.map(({ frontmatter, url }) => ({
		link: url,
		title: frontmatter.title,
		description: frontmatter.description,
		authors: frontmatter.authors,
		pubDate: parse(frontmatter.publishDate, 'yyyy/MM/dd', new Date()),
	}))
	.sort((a, b) => {
		if (isBefore(a.pubDate, b.pubDate)) return 1;
		if (isBefore(b.pubDate, a.pubDate)) return -1;
		return 0;
	});
export const get = () =>
	rss({
		title: 'GGbeng’s Blog',
		description: '记录生活和工作的blog',
		site: import.meta.env.SITE,
		items,
	});
