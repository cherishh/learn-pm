import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { mySchema } from './schema';
import { boldCommand } from './commands';
import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { history, undo, redo } from 'prosemirror-history';
import { popoverPlugin } from './popover';
import { insertEmoji, insertCollapse } from './commands';
import { getContentText, addEmojiStyle } from './utils';
import { data } from './test';
import './style.less';

const app = document.querySelector<HTMLDivElement>('#editor')!;
const test = document.querySelector<HTMLDivElement>('#test')!;
test.innerText = '123\nabc';

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
    // console.log(transaction, 'transaction');
    // console.log('Document went from', transaction.before.content, 'to', transaction.doc.content);
    let newState = view.state.apply(transaction);
    view.updateState(newState);
  },
});

const btn1 = document.querySelector('#btn');

btn1?.addEventListener('click', () => {
  insertCollapse()(view);
});

window.view = view;
