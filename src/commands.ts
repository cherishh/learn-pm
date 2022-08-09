import { toggleMark } from 'prosemirror-commands';
import { EditorState, Transaction } from 'prosemirror-state';
import { Node } from 'prosemirror-model';
import { mySchema } from './schema';
import { addEmojiStyle } from './addEmojiStyle';
import { EditorView } from 'prosemirror-view';

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
      dispatch(tr);
      addEmojiStyle();
    }

    return true;
  };
};
