import type { Source } from '../../../types/news-api';
import './sources.css';

class Sources {
	public draw(data: Source[]): void {
		const fragment = document.createDocumentFragment();
		const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement | null;

		if (!sourceItemTemp) {
			console.error('Template #sourceItemTemp not found');
			return;
		}

		data.forEach((item) => {
			const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

			const name = sourceClone.querySelector('.source__item-name') as HTMLElement | null;
			if (name) {
				name.textContent = item.name;
			}

			const sourceItem = sourceClone.querySelector('.source__item') as HTMLElement | null;
			if (sourceItem) {
				sourceItem.setAttribute('data-source-id', item.id);
			}

			fragment.append(sourceClone);
		});

		const sourcesContainer = document.querySelector('.sources') as HTMLElement | null;
		if (sourcesContainer) {
			sourcesContainer.append(fragment);
		}
	}
}

export default Sources;
