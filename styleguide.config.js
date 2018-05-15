module.exports = {
  webpackConfig: require('./webpack.config.js'),
  components: 'Vue-components/*.vue',
  mixins: [
    {
      methods: {
        formatFromCamelCase: text => {
          return text
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (substr) => { return substr.toUpperCase(); });
        }
      }
    }
  ]
};