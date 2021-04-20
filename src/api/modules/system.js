import request from './../../utils/request'

export default {
  /** 获取系统信息 */
  getSystemInfo() {
    return request.get('/sys/sysSituation')
  },
  /** 获取所有头像 */
  getAvatar() {
    return request.get('/sys/getFaceImages')
  },
  getAllUser() {
    return request.get(`/sys/getAllUser`)
  },
  /**
   * month 表示获取哪一个月的用户注册数量
   */
  getUserBySignTime(month) {
    const {lt, rt} = month
    return request.get(`/sys/getUsersBySignUpTime?lt=${lt}&rt=${rt}`)
  },
  /** 获取所有在线用户 */
  getOnlineUser() {
    return request.get(`/sys/countOnlineUser`)
  },
  /** 更改用户状态：0；正常，1：冻结，2：注销 */
  changeUserStatus(data) {
    const {uid, status} = data
    return request.get(`/sys/changeUserStatus?uid=${uid}&status=${status}`)
  },
  getUserInfo(id) {
    return request.get(`/user/getUserInfo?uid=${id}`)
  },
  /** 获取所有敏感信息列表 */
  getSensitiveMessageList() {
    return request.get(`/sys/getSensitiveMessageList`)

  },
  /** 获取所有反馈列表 */
  getFeedbackList() {
    return request.get(`/sys/getFeedbackList`)
  },
}
