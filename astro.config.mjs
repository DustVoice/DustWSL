// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

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
			expressiveCode: {
				themes: ['catppuccin-macchiato', 'catppuccin-latte'],
				plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
				defaultProps: {
					// Disable line numbers by default
					showLineNumbers: false,
				},
			}
		}),
	],
	site: 'https://dustvoice.github.io',
	base: 'DustWSL',
});
