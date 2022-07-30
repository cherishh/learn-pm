import { Schema } from 'prosemirror-model';

export const mySchema: Schema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: {
      group: 'block',
      content: 'text*',
      parseDOM: [{ tag: 'p' }],
      toDOM() {
        const p = document.createElement('p');
        return {
          dom: p,
          contentDOM: p,
        };
      },
    },
    text: { inline: true },
  },
  marks: {},
});
