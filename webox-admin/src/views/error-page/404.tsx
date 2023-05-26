import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'

const Error_404 = () => {
  const navigator = useNavigate()
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh'
    }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => navigator('/welcome')}
          >
            Back Home
          </Button>
        }
      />
    </div>
  )
}

export default Error_404
