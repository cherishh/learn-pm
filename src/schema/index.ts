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
    collapse: {
      group: 'block',
      content: 'collapse_title',
      parseDOM: [
        {
          tag: "div[class~='collapse']",
          getAttrs(dom) {
            const ele = dom as HTMLElement;
            return {
              active: ele.classList.contains('active'),
            };
          },
        },
      ],
      toDOM(node) {
        const { active } = node.attrs;
        const nodeAttrs = {
          class: `collapse${active ? ' active' : ''}`,
        };
        return ['div', nodeAttrs, 0];
      },
    },
    collapse_title: {
      content: 'text*',
      parseDOM: [
        {
          tag: "div[class~='collapse-title']",
          preserveWhitespace: 'full',
        },
      ],
      toDOM(node) {
        const attrs: any = {
          class: 'collapse-title',
        };
        return [
          'div',
          attrs,
          [
            'span',
            {
              class: 'collapse-title-text',
              spellCheck: false,
            } as any,
            0,
          ],
        ];
      },
    },
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
