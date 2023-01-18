import { NodeSpec } from 'prosemirror-model';

export const imageSchema: NodeSpec = {
  attrs: {
    width: { default: '' },
    src: { default: '' },
  },
  inline: true,
  group: 'inline',
  draggable: true,
  toDOM: (node) => {
    const {
      attrs: { width, src },
    } = node;
    const nodeAttrs = {
      src: src,
      width: width,
    };
    return ['img', nodeAttrs];
  },
  parseDOM: [
    {
      tag: 'img',
      getAttrs: (dom) => {
        const width = (dom as HTMLImageElement).getAttribute('data-width') || '';
        const src = (dom as HTMLImageElement).getAttribute('src') || '';
        return { width, src };
      },
    },
  ],
};
