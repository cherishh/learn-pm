import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Slice, Fragment, DOMSerializer, Node as ProsemirrorNode, DOMParser, Schema,  } from 'prosemirror-model';
import { Step } from 'prosemirror-transform';
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



const addTrVersion = (step: Step & {trVersion: string}) => {
  step.trVersion = String(new Date().getTime());
}

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
  dispatchTransaction(transaction) {
    console.log(transaction, 'transaction');
    const { steps } = transaction;
    steps.forEach(step => {
      addTrVersion(step)
    })
    // console.log('Document went from', transaction.before.content, 'to', transaction.doc.content);
    let newState = view.state.apply(transaction);
    view.updateState(newState);
  },
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
  console.log(steps, 'steps');
  const res = [];
  const countVersion = (arr) => {
    let result = [];
    let count = 0;
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      if (arr[i + 1] && arr[i].trVersion === arr[i + 1].trVersion) {
        count++;
      } else {
        result.push({ count: ++count, trVersion: arr[i].trVersion });
        count = 0;
      }
    }
    return result;
  };
  const versions = countVersion(steps);
  steps.forEach((step, index) => {
    const { count } = versions.find((v) => v.trVersion === step.trVersion)!;
    res.push({ ...step, stepsLength: count });
  });
  // console.log(countVersion(steps), 'added');
  return res;
};
const d = JSON.parse(data);
const d2j =
  '[{"stepType":"replaceAround","from":42,"to":46,"gapFrom":43,"gapTo":45,"insert":1,"slice":{"content":[{"type":"table_header","attrs":{"colspan":1,"rowspan":1,"colwidth":[83],"textAlign":null,"verticalAlign":null,"bgColor":null,"color":null,"numCell":null,"dataCellDiffId":null}}]},"structure":true,"trVersion":"1661415367633"},{"stepType":"replaceAround","from":56,"to":60,"gapFrom":57,"gapTo":59,"insert":1,"slice":{"content":[{"type":"table_cell","attrs":{"colspan":1,"rowspan":1,"colwidth":[83],"textAlign":null,"verticalAlign":null,"bgColor":null,"color":null,"numCell":null,"dataCellDiffId":null}}]},"structure":true,"trVersion":"1661415367613"},{"stepType":"replaceAround","from":70,"to":74,"gapFrom":71,"gapTo":73,"insert":1,"slice":{"content":[{"type":"table_cell","attrs":{"colspan":1,"rowspan":1,"colwidth":[83],"textAlign":null,"verticalAlign":null,"bgColor":null,"color":null,"numCell":null,"dataCellDiffId":null}}]},"structure":true,"trVersion":"1661415367623"},{"stepType":"replaceAround","from":56,"to":60,"gapFrom":57,"gapTo":59,"insert":1,"slice":{"content":[{"type":"table_cell","attrs":{"colspan":1,"rowspan":1,"colwidth":[83],"textAlign":null,"verticalAlign":null,"bgColor":null,"color":null,"numCell":null,"dataCellDiffId":null}}]},"structure":true,"trVersion":"1661415367613"},{"stepType":"replaceAround","from":70,"to":74,"gapFrom":71,"gapTo":73,"insert":1,"slice":{"content":[{"type":"table_cell","attrs":{"colspan":1,"rowspan":1,"colwidth":[83],"textAlign":null,"verticalAlign":null,"bgColor":null,"color":null,"numCell":null,"dataCellDiffId":null}}]},"structure":true,"trVersion":"1661415367623"}]';
const d2 = JSON.parse(d2j);
// d.push(
//   JSON.parse(
//     '{"stepType":"replaceAround","from":70,"to":74,"gapFrom":71,"gapTo":73,"insert":1,"slice":{"content":[{"type":"table_cell","attrs":{"colspan":1,"rowspan":1,"colwidth":[83],"textAlign":null,"verticalAlign":null,"bgColor":null,"color":null,"numCell":null,"dataCellDiffId":null}}]},"structure":true,"trVersion":"666"}',
//   ),
// );
console.log(addStepsLength(d));
