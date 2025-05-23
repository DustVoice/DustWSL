// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import starlightSidebarTopics from 'starlight-sidebar-topics'
import catppuccin from 'starlight-theme-catppuccin';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "DustWSL",
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/DustVoice/DustWSL' },
			],
			plugins: [
				catppuccin({ dark: 'macchiato-mauve', light: "latte-mauve" }),
				starlightSidebarTopics([
					{
						label: 'Introduction',
						link: 'intro/syntax/',
						icon: 'rocket',
						items: ['intro/syntax', 'intro/tooling'],
					},
					{
						label: 'Guides',
						link: 'pre/',
						icon: 'open-book',
						items: [
							{
								label: 'Prerequisites',
								items: ['pre', 'pre/wsl', 'pre/archwsl'],
							},
							{
								label: '/home/',
								items: [
									'home',
									'home/basic',
									'home/dotfiles',
									'home/editor',
									'home/shell',
									'home/scripting',
									{
										label: 'Smartcard',
										badge: {
											text: "Optional",
											variant: "note",
										},
										collapsed: true,
										items: [
											'home/smartcard',
											'home/smartcard/usbip',
											{
												label: 'GnuPG',
												items: [
													'home/smartcard/gnupg',
													'home/smartcard/gnupg/missing',
													'home/smartcard/gnupg/register',
													'home/smartcard/gnupg/ssh',
												],
											},
										],
									},
								],
							},
						]
					},
					{
						label: 'References',
						link: 'ref/',
						icon: 'information',
						items: [
							'ref',
							{
								label: 'GUI',
								items: [
									'ref/gui',
									'ref/gui/term',
								],
							},
							{
								label: 'Development',
								items: [
									{
										label: 'Languages',
										collapsed: true,
										autogenerate: {
											directory: 'ref/lang',
										},
									},
									'ref/doom',
								],
							}
						],
					},
				]),
			],
			expressiveCode: {
				themes: ['catppuccin-macchiato', 'catppuccin-latte'],
				plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
				defaultProps: {
					showLineNumbers: false,
					collapseStyle: 'collapsible-auto',
				},
			},
		}),
	],
	site: 'https://dustvoice.github.io',
	base: '/DustWSL/',
	trailingSlash: 'always',
});
