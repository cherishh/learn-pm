import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { mySchema } from './schema';
import { boldCommand } from './commands';
import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { history, undo, redo } from 'prosemirror-history';
import { popoverPlugin } from './popover';
import { insertEmoji } from './commands';
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
  handlePaste(view, evt, slice) {
    console.log(evt, 'evt');
    console.log(slice, 'slice');
  },
  transformPasted(slice) {
    console.log('transformPasted');
    return slice;
  },
  transformPastedHTML(html) {
    console.log('transformPastedHTML');
    return html;
  },
  handleClickOn(view, pos, node, nodePos, event, direct) {
    console.log('click on');
    return true;
  },
  handleClick(view, pos, event) {
    console.log('after click on');
  },
  handleDOMEvents: {
    click: (view, evt: Event) => {
      console.log('dom click ');
      return false;
    },
  },
});

const btn1 = document.querySelector('#btn');
const btn2 = document.querySelector('#query');
const btn3 = document.querySelector('#send');
const btn4 = document.querySelector('#btn4');

btn1?.addEventListener('click', () => {
  const type = prompt('emoji可选值为： OK, 心心, 鼓掌', 'OK') || 'OK';
  if (['OK', '心心', '鼓掌'].indexOf(type) !== -1) {
    insertEmoji(type)(view);
  }
});

btn2?.addEventListener('click', () => {
  const contentJSON = `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"abc\\n123"},{"type":"emoji","attrs":{"type":"OK"}},{"type":"text","text":"b"},{"type":"emoji","attrs":{"type":"心心"}},{"type":"text","text":"c"},{"type":"emoji","attrs":{"type":"鼓掌"}},{"type":"text","text":"d"}]}]}`;
  const content = JSON.parse(contentJSON);
  console.log(content);
  const doc = view.state.schema.nodeFromJSON(content);
  const state = EditorState.create({
    schema: view.state.schema,
    doc,
    plugins: [
      keymap(baseKeymap),
      history(),
      keymap({ 'Mod-z': undo, 'Shift-Mod-z': redo, 'Mod-b': boldCommand }),
      popoverPlugin('pop!'),
    ],
  });
  addEmojiStyle();
  view.updateState(state);
});

btn3?.addEventListener('click', () => {
  const content = view.state.doc;
  const contentText = getContentText(content);
  console.log({
    content: JSON.stringify(content.toJSON()),
    contentText,
  });
  alert(`${contentText} \n\n打开控制台查看更多`);
});

btn4?.addEventListener('click', () => {
  const tr1 = view.state.tr;
  const tr2 = view.state.tr;
  console.log(tr1, 1);
  console.log(tr2, 2);
  tr1.insertText('11');
  tr2.insertText('22');
  view.dispatch(tr1);
  view.dispatch(tr2);
});

window.view = view;
