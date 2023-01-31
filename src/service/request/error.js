export function handleAxiosError(axiosError) {
  const { response } = axiosError
  if (response != null) {
    handleResponseError(response)
  }
  if (!window.navigator.onLine) {
    // TODO 添加错误信息提示
    // ElMessage.error('网络连接失败')
    // 可以跳转到错误页面，也可以不做操作
    // return router.replace({
    // path: '/404'
    // });
  }
  // 抛出异常
  return Promise.reject(response)
}

export function handleResponseError(responseError) {
  const { status, config } = responseError
  switch (status) {
    case 404:
      $message.error(`找不到请求的API路径：${config.url ?? ''}`)
      break
    case 401:
      // TODO 添加错误信息提示
      // ElMessage.error('登录失败，请重新登录')
      break
    default:
      $message.error('服务器错误，请求失败！')
      break
  }
}
