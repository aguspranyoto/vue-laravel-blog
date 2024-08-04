import { APP } from '@/helper/APP'

export interface IRegisterInput {
  name: string
  email: string
  password: string
}

export type RegisterResponseType = {
  user: {
    name: string
    email: string
  }
  message: string
}

export const createUser = async (input: IRegisterInput) => {
  try {
    const res = await fetch(`${APP.laravelApiBaseURL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    const data: RegisterResponseType = await res.json()
    return data
  } catch (error) {
    console.error('Error creating user: ', error)
    throw error
  }
}
