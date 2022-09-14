import rss from '@astrojs/rss';
import { parse } from 'date-fns';

const postImportResult = import.meta.globEager('./blog/posts/*.mdx');
const posts = Object.values(postImportResult);

export const get = () =>
	rss({
		title: 'GGbeng’s Blog',
		description: '记录生活和工作的blog',
		site: import.meta.env.SITE,
		items: posts.map(({ frontmatter, url }) => ({
			link: url,
			title: frontmatter.title,
			description: frontmatter.description,
			authors: frontmatter.authors,
			pubDate: parse(frontmatter.publishDate, 'MMMM d, yyyy', new Date()),
		})),
	});
