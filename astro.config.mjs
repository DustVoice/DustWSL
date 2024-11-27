// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "DustWSL",
			social: {
				github: 'https://github.com/DustVoice/DustWSL',
			},
			sidebar: [
				{
					label: 'Introduction',
					slug: 'index'
				},
				{
					label: 'Prerequisites',
					autogenerate: { directory: 'pre' },
				},
				{
					label: 'Setting up HOME',
					autogenerate: { directory: 'home' },
				},
				{
					label: 'Optional',
					autogenerate: { directory: 'opt' },
				},
			],
		}),
	],
});
