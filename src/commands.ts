import { toggleMark } from 'prosemirror-commands';
import { EditorState, Transaction } from 'prosemirror-state';
import { mySchema } from './schema';

const emojiType = mySchema.nodes.emoji;

export const boldCommand = toggleMark(mySchema.marks.bold);

export const insertEmoji = (type: string) => {
  return function (state: EditorState, dispatch: (tr: Transaction) => any) {
    const { $from } = state.selection;
    const index = $from.index();
    console.log($from.parent, state.selection.$anchor, index);
    if (!$from.parent.canReplaceWith(index, index, emojiType)) return false;
    console.log(type, 'type');
    if (dispatch) dispatch(state.tr.replaceSelectionWith(emojiType.create({ type })));
    return true;
  };
};
