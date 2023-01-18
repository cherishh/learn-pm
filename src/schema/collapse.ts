import { NodeSpec } from 'prosemirror-model';

export const collapseSchema: NodeSpec = {
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
}

export const collapse_titleSchema: NodeSpec = {
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
}