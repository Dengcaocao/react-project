import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'

class Service {
  instance: AxiosInstance
  constructor () {
    // 创建axios实例并挂载到实例上
    this.instance = axios.create({
      baseURL: '/api-webox',
      method: 'GET',
      timeout: 10000
    })
  }

  // 拦截器
  interceptors (instance: AxiosInstance) {
    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      return config
    }, (error: AxiosError) => {
      return Promise.reject(error)
    })
  
    instance.interceptors.response.use((response: AxiosResponse) => {
      return response
    }, (error: AxiosError) => {
      return Promise.reject(error)
    })
  }

  reurest (options: AxiosRequestConfig) {
    // 注册拦截器
    this.interceptors(this.instance)
    return this.instance(options)
  }
}

export default new Service()
