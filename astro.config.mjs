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
					items: ["pre", "pre/wsl", "pre/archwsl"],
				},
				{
					label: 'Home',
					items: [
						{
							label: "Smart Card",
							autogenerate: { directory: 'home/smartcard' },
						}
					],
				},
			],
		}),
	],
	site: 'https://dustvoice.github.io',
	base: 'DustWSL',
});
