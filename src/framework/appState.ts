
export type PageTypes = "OVERVIEW" | "ADMIN_PLANNING" | "ADMIN_DISHES" | "ADMIN_LOGIN";

export type AppState = {
  username : string | undefined
  isAdmin : boolean
  activePage : PageTypes
  requestedPage : PageTypes
  lastPage : PageTypes
}