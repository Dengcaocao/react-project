import axios from '../utils/service'

interface Iparams {
  params?: object, // 查询参数
  data?: object // 请求参数
}

export default {
  getData (params?: Iparams) {
    return axios.reurest({
      url: 'banner.json',
      method: 'get',
      params
    })
  },
  getFriendChaidData (params?: Iparams) {
    return axios.reurest({
      url: 'friendChain.json',
      method: 'get',
      params
    })
  },
  getDemoData (params?: Iparams) {
    return axios.reurest({
      url: 'demo.json',
      method: 'get',
      params
    })
  },
  getImageResources (params?: Iparams) {
    return axios.reurest({
      url: 'imageResource.json',
      method: 'get',
      params
    })
  }
}
