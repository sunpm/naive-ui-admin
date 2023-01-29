declare interface LoginReqForm {
  username: string
  password: string
}

declare interface LoginResData {
  token: string
  avatar: string
  id: number
  menu: any[]
  nickname: string
  permission: string[]
}
