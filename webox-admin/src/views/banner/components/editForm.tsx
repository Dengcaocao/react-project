import React, { useState, useImperativeHandle } from 'react'
import { Modal } from 'antd'

// eslint-disable-next-line react/display-name
const EditForm: React.FC = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('Content of the modal')
  
  useImperativeHandle(ref, () => {
    return {
      showModal
    }
  })

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds')
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setVisible(false)
  }

  return (
    <Modal
      title="Title"
      open={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <p>{modalText}</p>
    </Modal>
  )
})

export default EditForm
