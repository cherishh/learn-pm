import { Node } from 'prosemirror-model';
import { emojis } from './consts';
import { mySchema } from './schema';

export const addEmojiStyle = () => {
  if (document.getElementById('emoji-style-sheet')) return;
  const style = document.createElement('style');
  style.id = 'emoji-style-sheet';
  document.head.appendChild(style);
  const rules = emojis.map((emoji) => {
    return `
    img[data-emoji-type="${emoji.type}"]{
      background-position: ${emoji.position.x}em ${emoji.position.y}em;
    }
    `;
  });
  style.innerHTML = rules.join('');
};

const schemeNodes = mySchema.nodes;
export const quoteAllowedNodeInfo = new Map<string, any>([
  [schemeNodes.emoji.name, (node: Node) => (node.attrs.type ? `[${node.attrs.type}]` : `[表情]`)],
  [schemeNodes.text.name, (node: Node) => node.textContent],
  [schemeNodes.paragraph.name, (node: Node) => ''],
]);

export const isLeafNode = (node: Node) => {
  return node.isAtom || ['link', 'status', 'code_block'].includes(node.type.name);
};

export function getContentText(pNode: Node) {
  let result = '';
  pNode.descendants((node: Node) => {
    const textFunc = quoteAllowedNodeInfo.get(node.type.name);
    if (textFunc) {
      result += textFunc(node);
      // 如果是非叶子节点，则继续遍历
      return !isLeafNode(node);
    }
  });
  return result;
}
