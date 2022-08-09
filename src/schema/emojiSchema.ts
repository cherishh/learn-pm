import { NodeSpec } from 'prosemirror-model';
import { emojis, bg } from '../consts';

const isEmoji =
  (ls: any[]) =>
  (type: string): Boolean => {
    if (!type) return false;
    return ls.some((item) => item.type === type);
  };

export const emojiSchema: NodeSpec = {
  attrs: {
    type: { default: 'OK' },
  },
  inline: true,
  group: 'inline',
  draggable: true,
  toDOM: (node) => {
    const {
      attrs: { type },
    } = node;
    const nodeAttrs = {
      src: bg,
      class: `emoji`,
      'data-emoji-type': type,
    };
    return ['img', nodeAttrs, 0];
  },
  parseDOM: [
    {
      tag: 'img[emoji-type]',
      getAttrs: (dom) => {
        const type = (dom as HTMLImageElement).getAttribute('emoji-type') || '';
        return isEmoji(emojis)(type) ? { type } : false;
      },
    },
  ],
};
