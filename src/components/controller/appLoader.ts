import type { NewsApiParams } from '../../types/news-api';
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
}

export default AppLoader;
