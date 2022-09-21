import { toggleMark } from 'prosemirror-commands';
import { mySchema } from './schema';
import { addEmojiStyle } from './utils';
import { EditorView } from 'prosemirror-view';
import { Fragment } from 'prosemirror-model';
import { v4 as uuidV4 } from 'uuid';

const emojiType = mySchema.nodes.emoji;

export const boldCommand = toggleMark(mySchema.marks.bold);

export const insertEmoji = (type: string) => {
  return function (view: EditorView) {
    const { state, dispatch } = view;
    const { $from } = state.selection;
    const index = $from.index();
    if (!$from.parent.canReplaceWith(index, index, emojiType)) return false;
    if (dispatch) {
      const tr = state.tr.replaceSelectionWith(emojiType.create({ type }));
      console.log(tr, 'tr');
      dispatch(tr);
      addEmojiStyle();
    }

    return true;
  };
};

export const insertCollapse = () => {
  return function (view: EditorView) {
    const { state, dispatch } = view;
    const { schema } = state;
    const { collapse, collapse_title } = schema.nodes;
    const titleNode: any = collapse_title.createAndFill();
    const collapseNode = collapse.create({ id: uuidV4() }, Fragment.from([titleNode]));
    const tr = state.tr.replaceSelectionWith(collapseNode);
    // tr.insertText('点击展开内容', state.selection.from);
    console.log(tr, 'tr');
    console.log(state.selection, 'selection');
    dispatch(tr);
    // NEW 一个node selection

    return true;
  };
};
