
export type RequestPageType = {
  kind : 'RequestPageType'
  page : PageTypes
}

export type LogoutAdminType = {
  kind : 'LogoutAdminType'
}

export type ActionTypes = 
  | RequestPageType
  | LogoutAdminType

export type PageTypes = "OVERVIEW" | "ADMIN_PLANNING" | "ADMIN_DISHES" | "ADMIN_LOGIN" | "ADMIN_ADD_DISH" | "ADMIN_EDIT_DISH";

export type AppState = {
  username : string | undefined
  isAdmin : boolean
  activePage : PageTypes
  previousPage : PageTypes
  action : ActionTypes
  payload : IDish | undefined
}

