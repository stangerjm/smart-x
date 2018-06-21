export function svg() {
  const files = require.context('!svg-sprite-loader!../images/svg', false, /.*\.svg$/);
  files.keys().forEach(files);
}