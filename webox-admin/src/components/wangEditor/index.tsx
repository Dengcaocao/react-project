import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig } from '@wangeditor/editor'

export interface PropsType {
  value: string,
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void
}

function WangEditor(props: PropsType, ref: React.Ref<unknown> | undefined) {

  const { value, onChange } = props

  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)

  // 编辑器内容
  const [html, setHtml] = useState('<p></p>')

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...'
  }

  const handleChange = (value: any) => {
    setHtml(editor.getHtml(value))
    onChange(value)
  }

  useImperativeHandle(ref, () => {
    return {
      isEmpty: () => editor.isEmpty(),
      clear: () => editor.clear()
    }
  })

  useEffect(() => {
    setHtml(value)
  }, [value])

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <div style={{ border: '1px solid #ccc', zIndex: 100}}>
      <Toolbar
        editor={editor}
        mode="default"
        style={{ borderBottom: '1px solid #ccc' }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        onChange={handleChange}
        mode="default"
        style={{ height: '500px', overflowY: 'hidden' }}
      />
    </div>
  )
}

export default forwardRef(WangEditor)
