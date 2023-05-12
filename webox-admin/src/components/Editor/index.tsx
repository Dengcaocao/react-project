import React, { useEffect, useState } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

export interface PropsType {
  placeholder: string,
  value: string,
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void
}
 
const Editor = (props: PropsType) => {

  const { placeholder, value, onChange } = props

  const [editorState, setEditorState] = useState<any>('')

  useEffect(() => {
    setEditorState(value)
  }, [value])
  
  return (
    <div className="editor">
      <BraftEditor
        placeholder={placeholder}
        value={editorState}
        onChange={editorState => {
          setEditorState(editorState)
          onChange(editorState.toHTML())
        }}
      />
    </div>
  )
}

export default Editor
