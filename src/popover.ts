import { EditorView } from 'prosemirror-view';
import { Plugin, PluginKey } from 'prosemirror-state';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

const key = new PluginKey('popover');

const createPopover = (content: string) => {
  const popover = tippy(document.body, {
    content: content || '',
    placement: 'top',
    theme: 'light',
    showOnCreate: false,
    interactive: true,
    trigger: 'manual',
  });

  return popover;
};

const calcPopoverPos = (editorView: EditorView) => {
  const { anchor, head } = editorView.state.selection;
  const headCoord = editorView.coordsAtPos(head);

  const clientRect = new DOMRect(
    headCoord.left,
    headCoord.top,
    headCoord.right - headCoord.left,
    headCoord.bottom - headCoord.top,
  );

  return clientRect;
};

export const popoverPlugin = (text: string) => {
  const popover = createPopover(text);

  return new Plugin({
    key,
    view: (editorView: EditorView) => {
      return {
        update(view) {
          const selection = editorView.state.selection;
          const { anchor, head } = selection;
          if (anchor === head) {
            popover.hide();
          } else {
            popover.setProps({
              getReferenceClientRect: () => calcPopoverPos(view),
            });

            popover.show();
          }
        },
        destroy() {
          popover.destroy();
        },
      };
    },
  });
};
