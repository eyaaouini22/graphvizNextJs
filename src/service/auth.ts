import Cookies from "js-cookie"

export const isAuthenticated = () => {
  return !!Cookies.get("token")
}

export const setToken = (token: string) => {
  Cookies.set("token", token)
}

export const logout = () => {
  Cookies.remove("token")
}

export const login = () => {
  setToken("1")
}
