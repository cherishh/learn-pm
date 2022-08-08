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
  return insertEmoji('ok')(view.state, view.dispatch);
  const type = prompt('emoji可选值为： ok, heart, clap', 'ok') || 'ok';
  if (['ok', 'heart', 'clap'].indexOf(type) !== -1) {
    insertEmoji(type)(view.state, view.dispatch);
  }
});

window.view = view;
