const path = require('path')

module.exports = {
    test: /\.(png|jpeg)$/, loader: 'url-loader?limit=8192',
    images: {domains: ['http://localhost:3000', "https://ethanhicks.com"]},
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    distDir: "nextjs",
    env: {
        FIREBASE_PROJECT_ID: "ethan-hicks",
    },
    experimental: {
      sprFlushToDisk: false,
    }
}
