const presets = ['next/babel'];
const plugins = [
  ['styled-components', { 'ssr': true }],
]

if(process.env['NODE_ENV'] === 'production') {
  plugins.push(['transform-remove-console'])
}

module.exports = {presets, plugins};