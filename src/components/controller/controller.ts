import type { EverythingResponse, SourcesResponse } from '../../types/news-api';
import AppLoader from './appLoader';

type SourcesCallback = (data: SourcesResponse) => void;
type NewsCallback = (data: EverythingResponse) => void;

class AppController extends AppLoader {
	public getSources(callback: SourcesCallback): void {
		super.getResp<SourcesResponse>({ endpoint: 'sources' }, callback);
	}

	public getNews(e: MouseEvent, callback: NewsCallback): void {
		let target = e.target as HTMLElement | null;
		const NewsContainer = e.currentTarget as HTMLElement;

		while (target && target !== NewsContainer) {
			if (target.classList.contains('source__item')) {
				const sourceId = target.getAttribute('data-source-id');
				if (sourceId && NewsContainer.getAttribute('data-source') !== sourceId) {
					NewsContainer.setAttribute('data-source', sourceId);
					super.getResp<EverythingResponse>(
						{
							endpoint: 'everything',
							options: { apiKey: '', sources: sourceId },
						},
						callback
					);
				}
				return;
			}
			target = target.parentElement;
		}
	}
}

export default AppController;
