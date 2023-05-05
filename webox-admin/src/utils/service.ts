import axios from 'axios'

interface IReuest {
  url: '/user',
  method: 'get',
  baseURL: 'https://some-domain.com/api/',
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  params: {
    ID: 12345
  },
  data: {
    firstName: 'Fred'
  },
  timeout: 1000, // default is `0` (no timeout)

  withCredentials: false, // default

  responseType: 'json', // default

  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  }
}

interface IResponse {
  data: object,
  status: number,
  statusText: string,
  headers: object,
  config: object,
  request: object,
}

class Service {
  instance: any
  constructor () {
    this.instance = axios.create({
      baseURL: '/api-webox',
      timeout: 10000
    })
  }

  interceptors (instance: any) {
    instance.interceptors.request.use((config: object) => {
      return config
    }, (error: object) => {
      return Promise.reject(error)
    })
  
    instance.interceptors.response.use((response: IResponse) => {
      return response
    }, (error: object) => {
      return Promise.reject(error)
    })
  }

  reurest (options: object) {
    this.interceptors(this.instance)
    this.instance(options)
  }
}

export default new Service()
