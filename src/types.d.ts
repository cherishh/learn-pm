import { EditorView } from 'prosemirror-view';

declare global {
  interface Window {
    view?: EditorView;
  }
}

export {};
