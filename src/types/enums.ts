/*
 * Categories supported by News API /v2/sources.
 * @see https://newsapi.org/docs/endpoints/sources
 */

export enum Category {
	Business = 'business',
	Entertainment = 'entertainment',
	General = 'general',
	Health = 'health',
	Science = 'science',
	Sports = 'sports',
	Technology = 'technology',
}

/*
 * Sort order for News API /v2/everything.
 * @see https://newsapi.org/docs/endpoints/everything
 */

export enum SortBy {
	Relevancy = 'relevancy',
	Popularity = 'popularity',
	PublishedAt = 'publishedAt',
}
