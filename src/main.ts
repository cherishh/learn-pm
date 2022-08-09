import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { mySchema } from './schema';
import { boldCommand } from './commands';
import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { history, undo, redo } from 'prosemirror-history';
import { popoverPlugin } from './popover';
import { insertEmoji } from './commands';
import './style.less';

const app = document.querySelector<HTMLDivElement>('#editor')!;

export const view = new EditorView(app, {
  state: EditorState.create({
    schema: mySchema,
    plugins: [
      keymap(baseKeymap),
      history(),
      keymap({ 'Mod-z': undo, 'Shift-Mod-z': redo, 'Mod-b': boldCommand }),
      popoverPlugin('pop!'),
    ],
  }),
  dispatchTransaction(transaction) {
    // console.log('Document went from', transaction.before.content, 'to', transaction.doc.content);
    let newState = view.state.apply(transaction);
    view.updateState(newState);
  },
});

const btn = document.querySelector('#btn');
btn?.addEventListener('click', () => {
  const type = prompt('emoji可选值为： OK, 心心, 鼓掌', 'OK') || 'OK';
  if (['OK', '心心', '鼓掌'].indexOf(type) !== -1) {
    insertEmoji(type)(view);
  }
});

window.view = view;
