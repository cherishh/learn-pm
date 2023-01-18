import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Slice, Fragment, DOMSerializer, Node as ProsemirrorNode, DOMParser, Schema,  } from 'prosemirror-model';
import { mySchema } from './schema';
import { boldCommand } from './commands';
import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { history, undo, redo } from 'prosemirror-history';
import { popoverPlugin } from './plugins/popover';
import { insertEmoji, insertCollapse } from './commands';
import { getContentText, addEmojiStyle } from './utils';
import { data } from './test';
import './style.less';

const editor = document.querySelector<HTMLDivElement>('#editor')!;
// const test = document.querySelector<HTMLDivElement>('#test')!;
// test.innerText = '123\nabc';

export const view = new EditorView(editor, {
  state: EditorState.create({
    schema: mySchema,
    plugins: [
      keymap(baseKeymap),
      history(),
      keymap({ 'Mod-z': undo, 'Shift-Mod-z': redo, 'Mod-b': boldCommand }),
      // popoverPlugin('pop!'),
    ],
  }),
  // dispatchTransaction(tr) {
  //   console.log(tr, 'transaction');
  //   const steps = tr.steps;
  //   console.log(steps, 'steps');
  //   const stepJson = steps.map((s) => s.toJSON());
  //   console.log(stepJson, 'stepjson');
  //   // console.log('Document went from', transaction.before.content, 'to', transaction.doc.content);
  //   let newState = view.state.apply(tr);
  //   view.updateState(newState);
  // },
});

const btn1 = document.querySelector('#btn');

// btn1?.addEventListener('click', () => {
//   insertCollapse()(view);
// });

btn1?.addEventListener('click', () => {
  const { state, dispatch } = view;
  const { tr, selection, doc } = state;
  console.log(doc.content.size, 'size');
  // const _slice = new Slice(Fragment.from(doc), 0, 0)
  // console.log(_slice, 'slice');
  // tr.replace(1, 2, _slice)
  // dispatch(tr)
});

window.view = view;
