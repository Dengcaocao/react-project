import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react'
import BraftEditor, { EditorState } from 'braft-editor'
import 'braft-editor/dist/index.css'

export interface PropsType {
  placeholder?: string,
  value: string,
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void
}

export interface RefType {
  isEmpty: () => boolean,
  clear: () => void
}
 
const Editor = (props: PropsType, ref: React.Ref<unknown> | undefined) => {

  const { placeholder, value, onChange } = props

  const editorRef = useRef<any>()

  const [editorState, setEditorState] = useState<EditorState>('<p></p>')

  useImperativeHandle(ref, () => {
    return {
      isEmpty: () => editorState ? editorState.isEmpty() : true,
      clear: () => setEditorState('<p></p>')
    }
  })

  useEffect(() => {
    console.log(editorState)
  }, [editorState])

  useEffect(() => {
    setEditorState(value)
  }, [value])
  
  return (
    <div className="editor">
      <BraftEditor
        ref={editorRef}
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

export default forwardRef(Editor)
