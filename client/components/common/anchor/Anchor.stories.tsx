import React from 'react';
import { Story, Meta } from '@storybook/react';
import Anchor, { AnchorProps } from './Anchor';

export default {
  component: Anchor,
  title: 'Anchor',
} as Meta;

const Template: Story<AnchorProps> = (args) => <Anchor {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default',
};
