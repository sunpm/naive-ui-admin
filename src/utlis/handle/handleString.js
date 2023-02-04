/**
 * 将 element 2 的 icon 转为 element 3 的 icon
 * @param elementIcon
 * @returns {*}
 */
export function elementIcon2elementPlusIcon(elementIcon) {
  const removePrefix = elementIcon.replace(/^el-icon-/, '')
  // 去除 s- 开头
  const removeS = removePrefix.replace(/^s-/, '')
  // 首字母大写
  const firstLetterUpper = removeS.replace(/^[a-z]/, (s) => s.toUpperCase())
  // - 后面的字母大写, 同时去除 -
  const camelCase = firstLetterUpper.replace(/-([a-z])/g, (s) => s[1].toUpperCase())
  return camelCase
}
