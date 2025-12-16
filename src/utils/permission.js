import tool from '@/utils/tool'

/**
 * 是否含有不限分类，有则表示全部允许通过
 */
export function permissionAll() {
  const allPermissions = '*/*/*'
  const permissions = tool.data.get('PERMISSIONS')
  return permissions.includes(allPermissions)
}

/**
 * 比对两组数据是否一致
 * @param news
 * @param old
 * @returns {boolean}
 */
export function judementSameArr(news, old) {
  // console.log(news)
  // console.log(old)
  let count = 0
  const leng = news.length
  for (const i in news) {
    for (const j in old) {
      if (news[i] === old[j]) {
        count++
        // console.log(news[i])
      }
    }
  }
  // console.log('相同的数量', count)
  return count === leng
}

export function permission(data) {
  const permissions = tool.data.get('PERMISSIONS')
  if (!permissions) {
    return false
  }
  const isHave = permissions.includes(data)
  return isHave
}

export function rolePermission(data) {
  const userInfo = tool.data.get('USER_INFO')
  if (!userInfo) {
    return false
  }
  const role = userInfo.role
  if (!role) {
    return false
  }
  const isHave = role.includes(data)
  return isHave
}
