import { Category } from '../../types/enums';
import type { EverythingResponse, SourcesResponse } from '../../types/news-api';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
	private readonly controller: AppController;

	private readonly view: AppView;

	constructor() {
		this.controller = new AppController();
		this.view = new AppView();
	}

	public start(): void {
		const sourcesContainer = document.querySelector('.sources') as HTMLElement | null;

		if (!sourcesContainer) {
			throw new Error('.sources container not found');
		}

		sourcesContainer.addEventListener('click', (e) =>
			this.controller.getNews(e, (data: EverythingResponse) => this.view.drawNews(data))
		);

		const categorySelect = document.querySelector('#categorySelect') as HTMLSelectElement | null;

		if (categorySelect) {
			categorySelect.addEventListener('change', () => {
				const value = categorySelect.value;
				const category = value === '' ? undefined : (value as Category);
				this.loadSources(category);
			});
		}

		this.loadSources(undefined);
	}

	private loadSources(category: Category | undefined): void {
		this.controller.getSources(category, (data: SourcesResponse) => this.view.drawSources(data));
	}
}

export default App;
