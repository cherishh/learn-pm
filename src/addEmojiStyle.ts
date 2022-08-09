import { emojis } from './consts';

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
