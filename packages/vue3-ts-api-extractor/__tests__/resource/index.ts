import { dom, IconDefinition, IconPack, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';
import { forEach } from 'lodash-es';
import { App } from 'vue';
import * as components from './packages';
import './themes/styles/main.scss';
import { OComponentInstance } from './types';
/**
 * @beta
 * @param app - 新消息
 */
const install = (app: App): void => {
	app.component('FontAwesomeIcon', FontAwesomeIcon);
	app.component('FontAwesomeLayers', FontAwesomeLayers);
	app.component('FontAwesomeLayersText', FontAwesomeLayersText);
	forEach(components, (component, name) => {
		app.component(name, component);
	});
	if (!app.config.errorHandler) {
		app.config.errorHandler = (err, vm, info) => {
			(<Error>err).message = (<OComponentInstance>vm).cType__ + ':' + (<Error>err).message;

			console.error(err, vm, info);
		};
	}

	dom.watch();
};

/**
 * @beta
 * @param definitions - 新消息
 */
const addIcon = (...definitions: (IconDefinition | IconPack)[]): void => {
	library.add(...definitions);
};

export * from './components';
export * from './packages';
export * from './types';
export * from './utils';
export { addIcon };

const Owl = {
	install
};
export default Owl;
