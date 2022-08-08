import { Schema } from 'prosemirror-model';
import { emojiSchema } from './emojiSchema';

export const mySchema: Schema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: {
      group: 'block',
      content: 'inline*',
      parseDOM: [{ tag: 'p' }],
      toDOM() {
        const p = document.createElement('p');
        return {
          dom: p,
          contentDOM: p,
        };
      },
    },
    emoji: emojiSchema,
    text: { group: 'inline' },
  },
  marks: {
    bold: {
      parseDOM: [{ tag: 'b' }],
      toDOM() {
        const b = document.createElement('b');
        return {
          dom: b,
          contentDOM: b,
        };
      },
    },
  },
});
