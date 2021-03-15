const presets = [
  'next/babel'
];
const plugins = []

if(process.env['NODE_ENV'] === 'production') {
  plugins.push(['transform-remove-console'])
}

module.exports = {presets, plugins};