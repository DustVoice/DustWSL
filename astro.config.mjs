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
					items: ['pre', 'pre/wsl', 'pre/archwsl'],
				},
				{
					label: '$HOME',
					items: [
						'home',
						'home/basic',
						'home/dotpre',
						'home/dotter',
						'home/shell',
						{
							label: 'Smartcard',
							items: [
								'home/smartcard',
								'home/smartcard/usbip',
								{
									label: 'GnuPG',
									items: [
										'home/smartcard/gnupg',
										'home/smartcard/gnupg/permission',
										'home/smartcard/gnupg/missing',
										'home/smartcard/gnupg/register',
										'home/smartcard/gnupg/ssh',
									]
								},
								'home/scripts',
							]
						}
					],
				},
				{
					label: 'Optional',
					items: [
						'opt',
						'opt/doom'
					],
				},
			],
		}),
	],
	site: 'https://dustvoice.github.io',
	base: 'DustWSL',
});
