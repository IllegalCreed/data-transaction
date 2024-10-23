/**
 * 生成一个包含大小写字母和8位随机数字的唯一邮箱地址
 * @param prefix 邮箱前缀，默认为 'testuser'
 * @returns 生成的唯一邮箱地址
 */
export const generateUniqueEmail = (prefix: string = 'testuser'): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const randomChars = Array.from(
    { length: 8 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join('')
  return `${prefix}${randomChars}@example.com`
}
