import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { marks, nodes } from 'prosemirror-schema-basic';
// import './style.less';

const app = document.querySelector<HTMLDivElement>('#editor')!;

const mySchema = new Schema({ marks, nodes });

window.view = new EditorView(document.querySelector('#editor'), {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(app),
  }),
});
