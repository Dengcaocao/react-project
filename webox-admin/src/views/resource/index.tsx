import React from 'react'
import Waterfall from '@/components/Waterfall/Waterfall'

const Resource = () => {

  const dataList = [
    'https://img0.baidu.com/it/u=3425868493,3104015061&fm=253&fmt=auto&app=120&f=JPEG?w=1199&h=800',
    'https://img1.baidu.com/it/u=1960110688,1786190632&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
    'https://img1.baidu.com/it/u=4193612137,1746981558&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=683',
    'https://img0.baidu.com/it/u=4162443464,2854908495&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    'https://img2.baidu.com/it/u=567357414,4240886412&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    'https://img1.baidu.com/it/u=4202854243,1154414864&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
    'https://img0.baidu.com/it/u=1626237702,720888304&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    'https://img1.baidu.com/it/u=1650201936,4218389007&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313',
    'https://img2.baidu.com/it/u=1577373388,3492284830&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
    'https://img2.baidu.com/it/u=3917493196,3581858277&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
    'https://img1.baidu.com/it/u=1310564963,1641173348&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
    'https://img2.baidu.com/it/u=1771079238,1156389364&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    'https://img1.baidu.com/it/u=1814941428,1835608319&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    'https://img0.baidu.com/it/u=922902802,2128943538&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
    'https://img2.baidu.com/it/u=3446568306,4166688106&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
    'https://img1.baidu.com/it/u=2508381239,2324251691&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    'https://img2.baidu.com/it/u=3219435629,4248079746&fm=253&fmt=auto&app=138&f=JPEG?w=705&h=500',
    'https://img2.baidu.com/it/u=411252743,991394782&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
    'https://img0.baidu.com/it/u=808805078,2411211243&fm=253&fmt=auto&app=138&f=JPEG?w=755&h=500',
    'https://img1.baidu.com/it/u=4270144465,1604793144&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
    'https://img0.baidu.com/it/u=4166343201,1904776330&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889'
  ]

  const node = dataList.map(item => <img src={item} key={item} />)

  return (
    <Waterfall>
      {node}
    </Waterfall>
  )
}

export default Resource
