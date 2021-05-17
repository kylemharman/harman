import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { WordDividerComponent } from './word-divider.component';

export default {
  title: 'Form/Word Divider',
  component: WordDividerComponent,
  decorators: [
    moduleMetadata({
      imports: [MatDividerModule, FlexLayoutModule],
    }),
  ],
} as Meta;

const Template: Story<WordDividerComponent> = (args: WordDividerComponent) => ({
  component: WordDividerComponent,
  props: args,
});

export const Divider = Template.bind({});
Divider.args = {
  label: 'OR',
};
