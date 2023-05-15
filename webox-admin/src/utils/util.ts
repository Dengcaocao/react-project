export type keyType = 'webox-banner' | 'webox-recommend' | 'webox-demo'

export const setSessionStorage = (key: keyType, val: string) => {
  sessionStorage.setItem(key, val)
}

export const getSessionStorage = (key: keyType) => {
  return sessionStorage.getItem(key)
}

export const waitTime = (time: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}
