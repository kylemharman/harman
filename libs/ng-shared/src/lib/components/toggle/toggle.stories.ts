import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { ToggleComponent } from './toggle.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';

export default {
  title: 'Shared/Toggle',
  component: ToggleComponent,
  decorators: [
    moduleMetadata({
      declarations: [ToggleComponent],
      imports: [FlexLayoutModule, LayoutModule],
    }),
  ],
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: '#fafafa' },
        { name: 'dark', value: '#000000' },
      ],
    },
  },
} as Meta;

const template: Story<ToggleComponent> = (args: ToggleComponent) => ({
  component: ToggleComponent,
  props: args,
});

export const toggleSmall = template.bind({});
toggleSmall.args = {
  on: true,
  size: 'small',
};

export const toggleLarge = template.bind({});
toggleLarge.args = {
  on: false,
  size: 'large',
};

export const toggleWithLabel = () => ({
  template: `
    <div style="width: 200px;">
      <ha-toggle>Toggle Label</ha-toggle>
    </div>`,
});
