import { APP } from '@/helper/APP'

export interface ILoginInput {
  email: string
  password: string
}

export type LoginResponseType = {
  message: string
  isLogged: boolean
  user: {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    created_at: string
    updated_at: string
  }
  token: string
}

export const signInUser = async (input: ILoginInput) => {
  try {
    const res = await fetch(`${APP.laravelApiBaseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    const data: LoginResponseType = await res.json()
    return data
  } catch (error) {
    console.error('Error login: ', error)
    throw error
  }
}
