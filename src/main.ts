import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { mySchema } from './schema';
import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { history, undo, redo } from 'prosemirror-history';

import './style.less';

const app = document.querySelector<HTMLDivElement>('#editor')!;

export const view = new EditorView(app, {
  state: EditorState.create({
    schema: mySchema,
    plugins: [keymap(baseKeymap), history(), keymap({ 'Mod-z': undo, 'Shift-Mod-z': redo })],
  }),
  dispatchTransaction(transaction) {
    console.log('Document went from', transaction.before.content, 'to', transaction.doc.content);
    let newState = view.state.apply(transaction);
    view.updateState(newState);
  },
});

window.view = view;
