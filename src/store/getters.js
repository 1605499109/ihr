const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.userDetali.staffPhoto,
  name: state => state.user.userDetali.username,
  routess: state => state.permission.routes,
  // 当前用户的角色
  companyName: state => state.user.userDetali.companyName,
  // 部门
  departmentName: state => state.user.userDetali.departmentName
}
export default getters
