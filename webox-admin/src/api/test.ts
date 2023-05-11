import axios from '../utils/service'

interface Iparams {
  params?: object, // 查询参数
  data?: object // 请求参数
}

export default {
  getData (params?: Iparams) {
    return axios.reurest({
      url: 'index-banner.json',
      method: 'get',
      params
    })
  },
  getFriendChaidData (params?: Iparams) {
    return axios.reurest({
      url: 'index-icons.json',
      method: 'get',
      params
    })
  }
}
