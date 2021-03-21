import React from 'react';
import { Controlled as CodeMirrorDefault } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/theme/material.css';
import 'codemirror/mode/markdown/markdown.js';

interface CodeMirrorProps {
  markdown: string;
  onSetMarkdown: (markdown: string) => void;
}

function CodeMirror(props: CodeMirrorProps) {
  return (
    <CodeMirrorDefault
      value={props.markdown}
      options={{
        mode: 'markdown',
        theme: 'material',
        lineNumbers: true,
        readOnly: false,
      }}
      onBeforeChange={(editor, data, value) => {
        props.onSetMarkdown(value);
      }}
      onChange={(editor, data, value) => {}}
      {...props}
    />
  );
}

export default CodeMirror;
