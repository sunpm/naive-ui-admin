function createLocalStorage() {
  /** 默认缓存期限为7天 */
  const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

  function set(key, value, expire = DEFAULT_CACHE_TIME) {
    const storageData = {
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null
    };
    // 加盐
    // const json = encrypto(storageData);
    window.localStorage.setItem(key, JSON.stringify(storageData));
    return reactive(value)
  }

  function get(key) {
    const json = window.localStorage.getItem(key);
    if (json) {
      let storageData = null;
      try {
        // 解盐
        // storageData = decrypto(json);
      } catch {
        // 防止解析失败
      }
      // if (storageData) {
      //   const { value, expire } = storageData;
        const { value, expire } = JSON.parse(json);
        // 在有效期内直接返回
        if (expire === null || expire >= Date.now()) {
          return value;
        }
      // }
      remove(key);
      return null;
    }
    return null;
  }

  function remove(key) {
    window.localStorage.removeItem(key);
  }
  function clear() {
    window.localStorage.clear();
  }

  return {
    set,
    get,
    remove,
    clear
  };
}

export const localStg = createLocalStorage();
