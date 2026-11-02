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

		this.controller.getSources((data: SourcesResponse) => this.view.drawSources(data));
	}
}

export default App;
