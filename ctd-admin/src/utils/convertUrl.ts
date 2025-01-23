export function convertFileUrl(url: string | undefined) {
  if (!url) return undefined
  if (url.startsWith('http') || url.startsWith('blob')) {
    return url
  } else {
    if (import.meta.env.VITE_BACK_TYPE === 'nest') {
      url = `${import.meta.env.VITE_NEST_SERVER_URL}${url}`
    } else if (import.meta.env.VITE_BACK_TYPE === 'java') {
      url = `${import.meta.env.VITE_JAVA_SERVER_URL}${url}`
    }
    return url
  }
}
