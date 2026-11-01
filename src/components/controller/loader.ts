import type { NewsApiParams } from '../../types/news-api';

type HttpMethod = 'GET' | 'POST';

type LoaderCallback<T> = (data: T) => void;

interface RequestConfig {
	endpoint: string;
	options?: NewsApiParams;
}

class Loader {
	constructor(
		protected readonly baseLink: string,
		protected readonly options: NewsApiParams
	) {}

	public getResp<T>({ endpoint, options }: RequestConfig, callback: LoaderCallback<T>): void {
		this.load<T>('GET', endpoint, callback, options ?? this.options);
	}

	private errorHandler(res: Response): Response {
		if (!res.ok) {
			if (res.status === 401 || res.status === 404) {
				console.error(`Sorry, but there is ${res.status} error: ${res.statusText}`);
			}
			throw new Error(res.statusText);
		}
		return res;
	}

	private makeUrl(options: NewsApiParams, endpoint: string): string {
		const urlOptions: NewsApiParams = { ...this.options, ...options };
		let url = `${this.baseLink}${endpoint}?`;

		(Object.keys(urlOptions) as Array<keyof NewsApiParams>).forEach((key) => {
			const value = urlOptions[key];
			if (value !== undefined) {
				url += `${key}=${String(value)}&`;
			}
		});

		return url.slice(0, -1);
	}

	private load<T>(method: HttpMethod, endpoint: string, callback: LoaderCallback<T>, options: NewsApiParams): void {
		fetch(this.makeUrl(options, endpoint), { method })
			.then(this.errorHandler)
			.then((res) => res.json() as Promise<T>)
			.then((data) => callback(data))
			.catch((err: unknown) => console.error(err));
	}
}

export default Loader;
