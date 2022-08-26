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

const json = await fetch('https://s3plus.meituan.net/v1/mss_9d9e5b6deadb43adac208535b2d92427/files/emojis.json', {
  credentials: 'omit',
});
console.log(await json.json(), 'emojiConfig');

// const getProperSizedSteps = (steps: any[]) => {
//   const LIMIT_SIZE = 0.5 * 1000 * 1000;
//   if (steps.length <= 1) {
//     // logger.warn(`单个step大小超过限制`)
//     return steps;
//   }
//   const totalSize = JSON.stringify(steps).length;
//   if (totalSize < LIMIT_SIZE) {
//     return steps;
//   }

//   const size = (data: any[]) => JSON.stringify(data).length;
//   let res: any[] = [];

//   let l = 0;
//   let r = steps.length - 1;
//   if (size(steps) < LIMIT_SIZE) {
//     while (size(res) < LIMIT_SIZE) {
//       const mid = Math.floor((l + r) / 2);
//       const sz = size(steps.slice(0, mid));
//       if (sz < LIMIT_SIZE) {
//         res = res.concat(res.slice(l, mid));
//         l = mid;
//       } else {
//       }
//     }
//     // remove partial trVersion
//     return res;
//   }

//   while (size(res) > LIMIT_SIZE) {
//     const mid = Math.floor((l + r) / 2);
//     if (size(steps.slice(0, mid)) > LIMIT_SIZE) {
//       res = res.slice(0, mid);
//       r = mid;
//     }
//   }

//   console.log(res, 'res2');
//   console.log(size(res), 'size');
//   return res;
// };

const addStepsLength = (steps: any[]) => {
  let version = steps[0].trVersion;
  let count = 0;
  const lens: {
    idx: number;
    count: number;
  }[] = [];
  steps.forEach((s, idx) => {
    if (s.trVersion === version) {
      count++;
    } else {
      lens.push({ count, idx });
      version = s.trVersion;
      count = 1;
    }
  });
  console.log(lens);
  let p = 0;
  let stepsLength = -1;
  const res = steps.map((s, idx) => {
    if (idx > lens[p].idx) {
      p++;
    }
    stepsLength = lens[p].count;
    return {
      ...s,
      stepsLength,
    };
  });
  console.log(steps, 'added steps length');
  return res;
};
const d = JSON.parse(data);
const d2j =
  '[{"stepType":"replaceAround","from":42,"to":46,"gapFrom":43,"gapTo":45,"insert":1,"slice":{"content":[{"type":"table_header","attrs":{"colspan":1,"rowspan":1,"colwidth":[83],"textAlign":null,"verticalAlign":null,"bgColor":null,"color":null,"numCell":null,"dataCellDiffId":null}}]},"structure":true,"trVersion":"1661415367633"},{"stepType":"replaceAround","from":56,"to":60,"gapFrom":57,"gapTo":59,"insert":1,"slice":{"content":[{"type":"table_cell","attrs":{"colspan":1,"rowspan":1,"colwidth":[83],"textAlign":null,"verticalAlign":null,"bgColor":null,"color":null,"numCell":null,"dataCellDiffId":null}}]},"structure":true,"trVersion":"1661415367613"},{"stepType":"replaceAround","from":70,"to":74,"gapFrom":71,"gapTo":73,"insert":1,"slice":{"content":[{"type":"table_cell","attrs":{"colspan":1,"rowspan":1,"colwidth":[83],"textAlign":null,"verticalAlign":null,"bgColor":null,"color":null,"numCell":null,"dataCellDiffId":null}}]},"structure":true,"trVersion":"1661415367623"},{"stepType":"replaceAround","from":56,"to":60,"gapFrom":57,"gapTo":59,"insert":1,"slice":{"content":[{"type":"table_cell","attrs":{"colspan":1,"rowspan":1,"colwidth":[83],"textAlign":null,"verticalAlign":null,"bgColor":null,"color":null,"numCell":null,"dataCellDiffId":null}}]},"structure":true,"trVersion":"1661415367613"},{"stepType":"replaceAround","from":70,"to":74,"gapFrom":71,"gapTo":73,"insert":1,"slice":{"content":[{"type":"table_cell","attrs":{"colspan":1,"rowspan":1,"colwidth":[83],"textAlign":null,"verticalAlign":null,"bgColor":null,"color":null,"numCell":null,"dataCellDiffId":null}}]},"structure":true,"trVersion":"1661415367623"}]';
const d2 = JSON.parse(d2j);
console.log(d2, 'd2');
console.log(addStepsLength(d2));
