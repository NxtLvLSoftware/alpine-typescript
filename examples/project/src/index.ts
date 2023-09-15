import './style.css';

import {AlpineComponents} from '@nxtlvlsoftware/alpine-typescript';

import {AlertComponent} from './components/AlertComponent';
import {ToggleComponent} from './components/ToggleComponent';

AlpineComponents.bootstrap({
	bootstrapAlpine: true,
	components: {
		alert: AlertComponent,
		toggle: ToggleComponent
	},
	logErrors: true
});
