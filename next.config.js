module.exports = {
	webpack(config, options) {
		config.module.rules.push({
			loader: '@svgr/webpack',
			options: {
				prettier: false,
				svgo: true,
				svgoConfig: {
					plugins: [
						{
							name: 'preset-default',
							params: {
								overrides: { removeViewBox: false },
							},
						}
					],
				},
				titleProp: true,
			},
			test: /\.svg$/,
		});

		return config;
	},
	experimental: { appDir: true, serverComponentsExternalPackages: ["mongoose"], },
	images: {
		domains: ["lh3.googleusercontent.com"],
	},
};