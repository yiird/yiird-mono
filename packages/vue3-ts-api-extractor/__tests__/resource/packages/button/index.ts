import { App } from 'vue';
import OButton from './o-button.vue';
import { ButtonProps } from './o-button-props';

OButton.install = (app: App) => {
	app.component(OButton.name, OButton);
};

export { OButton, ButtonProps };
