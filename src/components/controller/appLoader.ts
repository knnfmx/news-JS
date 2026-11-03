import type { Category } from '../../types/enums';
import type { NewsApiParams, SourcesParams, SourcesResponse } from '../../types/news-api';
import Loader from './loader';

class AppLoader extends Loader {
	constructor() {
		const apiUrl = process.env.API_URL;
		const apiKey = process.env.API_KEY;

		if (!apiUrl || !apiKey) {
			throw new Error('API_URL and API_KEY must be defined. Check your .env file and dotenv-webpack configuration.');
		}
		const options: NewsApiParams = { apiKey };
		super(apiUrl, options);
	}
	public getSources(category: Category | undefined, callback: (data: SourcesResponse) => void): void {
		const params: Partial<SourcesParams> = category !== undefined ? { category } : {};
		super.getResp<SourcesResponse>({ endpoint: 'sources', options: params }, callback);
	}
}

export default AppLoader;
