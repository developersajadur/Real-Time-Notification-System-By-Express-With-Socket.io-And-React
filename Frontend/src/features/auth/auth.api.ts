import axios from "@/lib/axios"

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export const login = async (payload: LoginPayload) => {
  const res = await axios.post("/auth/login", payload)
  return res.data
}

export const register = async (payload: RegisterPayload) => {
  const res = await axios.post("/users/register", payload)
  return res.data
}
