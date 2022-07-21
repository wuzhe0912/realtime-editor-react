import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';

const EditorContent = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef) return;

    async function init() {
      // listening editor code change
      const updateListenerExtension = EditorView.updateListener.of((update) => {
        console.log(1, update);
        if (update.docChanged) {
          console.log(2);
        }
      });

      const state = EditorState.create({
        doc: 'console.log("Hello CodeSync!");',
        extensions: [
          basicSetup,
          javascript({ jsx: true }),
          dracula,
          keymap.of([indentWithTab]),
          updateListenerExtension,
        ],
      });

      const view = new EditorView({
        state,
        parent: document.querySelector('#editorRef'),
      });

      return () => view.destroy();
    }

    init();
  }, []);

  return <div ref={editorRef} id='editorRef'></div>;
};

export default EditorContent;
