import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
			dropShadow: {
				"sm": [
					"1px 1px 1px #898989",
					"-1px -1px 1px #ffffff"
				],
				"d-sm": [
					"1px 1px 1px #000",
					"-1px -1px 1px #4f6185"
				]
			},
			boxShadow: {
				"sm": [
					"3px 4px 5px #898989",
					"-3px -4px 5px #ffffff"
				],
				"full-sm": [
					"1px 1px 10px #898989",
					"-1px -1px 10px #cfcfcf"
				],
				"xs": [
					"1px 1px 1px #898989",
					"-1px -1px 1px #ffffff"
				],
				"full-xs": [
					"1px 1px 1px #898989",
					"-1px -1px 1px #cfcfcf"
				],
				"d-sm": [
					"3px 4px 5px #010204",
					"-3px -4px 5px #253d6a"
				],
				"d-xs": [
					"1px 1px 1px #010204",
					"-1px -1px 1px #253d6a"
				],
				"inner-sm": [
					"inset -4px -4px 4px #ffffff",
					"inset 4px 4px 4px #898989"
				],
				"inner-xs": [
					"inset -1px -1px 1px #ffffff",
					"inset 1px 1px 1px #898989"
				],
				"inner-d-xs": [
					"inset -1px -1px 1px rgba(58, 68, 93, 0.5)",
					"inset 1px 1px 1px #060C18"
				],
				"inner-d-sm": [
					"inset -4px -4px 4px rgba(58, 68, 93, 0.5)",
					"inset 4px 4px 4px #060C18"
				]
			}
		},
    },
    daisyui: {
		themes: [{
			light: {
				"base-100": "#fff",
				"base-200": "#F8F9FE",
				"base-300": "#F1F3F9",
				"base-content": "#384149",
				"error": "#fee2e2",
				"error-content": "#991B1B",
				"primary": "#DA5509",
				"primary-content": "#fff",
				"secondary": "#014294",
				"neutral": "#f0f8ff",
				"neutral-content": "#000",
				"success": "#cdffe1",
				"success-content": "#166534",
				"warning-content": "#854D0E",
				"info-content": "#1E40AF",
				"accent-content": "#007575",

				"accent": "#1FB2A5"
			},
			dark: {
				"base-100": "#035050",
				"base-200": "#02202c",
				"base-300": "#121E34",
				"base-content": "#fff",
				"error": "#7c4242",
				"error-content": "#FECACA",
				"primary": "#DA5509",
				"primary-content": "#fff",
				"secondary": "#00ffed",
				"neutral": "#020617",
				"neutral-content": "#fff",
				"success": "#1f2c24",
				"success-content": "#BBF7D0",
				"warning-content": "#FEF08A",
				"info-content": "#BFDBFE",
				"accent-content": "#00ffff",

				"accent": "#6af287",
			},
		}]
	},
    plugins: [
        require("tailwind-scrollbar")({ nocompatible: true }),
		require("daisyui")
    ]
}
export default config
