import postcssPresetEnv from 'postcss-preset-env';
import tailwind from 'tailwindcss';
import cssnano from 'cssnano';

import tailwindConfig from './tailwind.config.js';
import cssnanoConfig from './cssnano.config.cjs';

export const plugins = [
	postcssPresetEnv(),
	tailwind(tailwindConfig),
	cssnano(cssnanoConfig)
];
