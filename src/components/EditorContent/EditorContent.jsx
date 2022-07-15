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

    const state = EditorState.create({
      doc: 'console.log("Hello CodeSync!");',
      extensions: [
        basicSetup,
        javascript({ jsx: true }),
        dracula,
        keymap.of([indentWithTab]),
      ],
    });

    const view = new EditorView({
      state,
      parent: document.querySelector('#editorRef'),
    });

    return () => view.destroy();
  }, [editorRef]);

  return <div ref={editorRef} id='editorRef'></div>;
};

export default EditorContent;
