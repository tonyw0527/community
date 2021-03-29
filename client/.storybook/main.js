module.exports = {
  stories: [
    '../components/**/*.stories.mdx',
    '../components/**/*.stories.tsx'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@storybook/addon-console',
    'storybook-dark-mode/register',
  ]
}