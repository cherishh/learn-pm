import { EditorView } from 'prosemirror-view';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Node } from 'prosemirror-model';
import { createImageNodeView } from './nodeView';

export const imagePlugin = () => {

  return new Plugin({
    key: new PluginKey("image"),
    props: {
      nodeViews: {
        image: (node: Node, view: EditorView, getPos) => createImageNodeView(node, view, getPos)
      }
    },
    view: (editorView) => {
      return {
        update(view) {

        },
        destroy() {

        }
      }
    }
  }) 
}