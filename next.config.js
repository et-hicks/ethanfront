const withImages = require('next-images')
const path = require('path')

module.exports = {
    test: /\.(png|jpeg)$/, loader: 'url-loader?limit=8192',
    images: {
      domains: ['http://localhost:3000'],
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    }
}

module.exports = withImages()