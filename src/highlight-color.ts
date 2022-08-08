import { Decoration, DecorationSet, EditorView } from "prosemirror-view";
import { EditorState, Plugin, PluginKey } from "prosemirror-state";

const colorReg = /#(?:[0-9a-fA-F]{6})/g;

