import './style.css';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

import {AlpineComponents} from '@nxtlvlsoftware/alpine-typescript';

import {AlertComponent} from "./components/AlertComponent";
import {ToggleComponent} from "./components/ToggleComponent";

AlpineComponents.bootstrap({
	components: {
		alert: AlertComponent,
		toggle: ToggleComponent
	},
	logErrors: true
});
