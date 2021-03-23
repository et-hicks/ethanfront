const path = require('path')

module.exports = {
    test: /\.(png|jpeg)$/, loader: 'url-loader?limit=8192',
    images: {domains: ['http://localhost:3000', "https://ethanhicks.com", "https://us-central1-ethan-hicks.cloudfunctions.net/next", "https://ethan-hicks.web.app"]},
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    distDir: `${path.relative(process.cwd(), __dirname)}/nextjs`,
    env: {
        FIREBASE_PROJECT_ID: "ethan-hicks",
    },
    experimental: {
      sprFlushToDisk: false,
    }
}
