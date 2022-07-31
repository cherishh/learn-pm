import { Schema } from 'prosemirror-model';
import { toggleMark } from 'prosemirror-commands';

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

export const boldCommand = toggleMark(mySchema.marks.bold);
