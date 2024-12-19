// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import catppuccin from 'starlight-theme-catppuccin';

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
						'home/editor',
						'home/shell',
						'home/scripting',
						{
							label: 'Smartcard',
							collapsed: true,
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
									],
								},
							],
						},
					],
				},
				{
					label: 'Optional',
					items: [
						'opt',
						'opt/gui',
						'opt/doom',
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
			},
			plugins: [
				catppuccin({ dark: 'macchiato-mauve', light: "latte-mauve" }),
			],
		}),
	],
	site: 'https://dustvoice.github.io',
	base: 'DustWSL',
});
