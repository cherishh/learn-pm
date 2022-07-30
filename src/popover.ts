import { EditorView } from 'prosemirror-view';
import { Plugin, PluginKey } from 'prosemirror-state';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

function createPopover(el: HTMLElement) {
  const popover = tippy(el, {
    content: el.textContent || '',
    placement: 'top',
    theme: 'light',
    showOnCreate: false,
    interactive: true,
    trigger: 'mouseenter click',
    appendTo: el,
  });

  return popover;
}

export const createPlugin = () => {
  const key = new PluginKey('popover');
  const popover = createPopover();
  return new Plugin({
    key,
    view: (editorView: EditorView) => {
      return {
        update(view) {},
        destroy() {},
      };
    },
  });
};

const getPosition = (editorView: EditorView) => {
  const pos = editorView.state.selection.anchor;
  const coords = editorView.coordsAtPos(pos);
  const clientRect = new DOMRect(coords.left, coords.top, coords.right - coords.left, coords.bottom - coords.top);
  return clientRect;
};
