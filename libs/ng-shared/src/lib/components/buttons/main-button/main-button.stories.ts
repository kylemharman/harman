import { Story, Meta } from '@storybook/angular/types-6-0';
import { MainButtonComponent } from './main-button.component';

export default {
  title: 'Shared/Button',
  component: MainButtonComponent,
  argTypes: {
    borderColor: { control: 'color' },
  },
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: '#fafafa' },
        { name: 'dark', value: '#000000' },
      ],
    },
  },
} as Meta;

const template: Story<MainButtonComponent> = (args: MainButtonComponent) => ({
  component: MainButtonComponent,
  props: args,
});

export const primary = template.bind({});
primary.args = {
  primary: true,
  label: 'Primary Button',
};

export const secondary = template.bind({});
secondary.args = {
  label: 'Secondary Button',
};

export const fullWidth = template.bind({});
fullWidth.args = {
  fullWidth: true,
  label: 'Full Width Button',
};

export const large = template.bind({});
large.args = {
  size: 'large',
  label: 'Large Button',
};

export const medium = template.bind({});
medium.args = {
  size: 'medium',
  label: 'Medium Button',
};

export const small = template.bind({});
small.args = {
  size: 'small',
  label: 'Small Button',
};
