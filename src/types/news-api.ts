export interface ArticleSource {
	id: string | null;
	name: string;
}

export interface Article {
	source: ArticleSource;
	author: string | null;
	title: string;
	description: string | null;
	url: string;
	urlToImage: string | null;
	publishedAt: string;
	content: string | null;
}

export interface Source {
	id: string;
	name: string;
	description: string;
	url: string;
	category: string;
	language: string;
	country: string;
}

export interface NewsApiResponse {
	status: 'ok' | 'error';
}

export interface EverythingResponse extends NewsApiResponse {
	totalResults: number;
	articles: Article[];
}

export interface SourcesResponse extends NewsApiResponse {
	sources: Source[];
}

export interface ErrorResponse extends NewsApiResponse {
	status: 'error';
	code: string;
	message: string;
}

export interface NewsApiBaseParams {
	apiKey: string;
}

export interface EverythingParams extends NewsApiBaseParams {
	sources?: string;
	q?: string;
	from?: string;
	to?: string;
	language?: string;
	sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
	pageSize?: number;
	page?: number;
}

export interface SourcesParams extends NewsApiBaseParams {
	category?: string;
	language?: string;
	country?: string;
}

export type NewsApiParams = EverythingParams | SourcesParams;
