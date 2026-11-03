import type { Article } from '../../../types/news-api';
import './news.css';

const MAX_NEWS_ITEMS = 10;
const PLACEHOLDER_IMAGE = 'img/news_placeholder.jpg';

class News {
	public draw(data: ReadonlyArray<Readonly<Article>>): void {
		const news = data.length >= MAX_NEWS_ITEMS ? data.slice(0, MAX_NEWS_ITEMS) : data;

		const fragment = document.createDocumentFragment();
		const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;

		if (!newsItemTemp) {
			console.error('Template #newsItemTemp not found');
			return;
		}

		news.forEach((item, idx) => {
			const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
			const newsItem = newsClone.querySelector('.news__item') as HTMLElement | null;

			if (newsItem && idx % 2) {
				newsItem.classList.add('alt');
			}

			const photo = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
			if (photo) {
				photo.style.backgroundImage = `url(${item.urlToImage ?? PLACEHOLDER_IMAGE})`;
			}

			const author = newsClone.querySelector('.news__meta-author') as HTMLElement | null;
			if (author) {
				author.textContent = item.author ?? item.source.name;
			}

			const date = newsClone.querySelector('.news__meta-date') as HTMLElement | null;
			if (date) {
				date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
			}

			const title = newsClone.querySelector('.news__description-title') as HTMLElement | null;
			if (title) {
				title.textContent = item.title;
			}

			const source = newsClone.querySelector('.news__description-source') as HTMLElement | null;
			if (source) {
				source.textContent = item.source.name;
			}

			const content = newsClone.querySelector('.news__description-content') as HTMLElement | null;
			if (content) {
				content.textContent = item.description ?? '';
			}

			const readMore = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement | null;
			if (readMore) {
				readMore.setAttribute('href', item.url);
			}

			fragment.append(newsClone);
		});

		const newsContainer = document.querySelector('.news') as HTMLElement | null;
		if (newsContainer) {
			newsContainer.innerHTML = '';
			newsContainer.appendChild(fragment);
		}
	}
}

export default News;
