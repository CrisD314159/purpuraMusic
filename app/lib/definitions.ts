
import {z} from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .trim(),
})
export const SignUpFormSchema = z.object({
  firstname :z.string().min(3).max(30),
  surname :z.string().min(2).max(30),
  country: z.number(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string({message: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*-?&).'})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-])[A-Za-z\d@$!%*?&\-]{8,}$/)
})
export const EditAccountFormSchema = z.object({
  firstname :z.string().min(3).max(30),
  surname :z.string().min(2).max(30),
  country: z.number()
})
export const CreatePlayListFormSchema = z.object({
  imageUrl :z.string().url().optional(),
  name :z.string().min(2).max(30),
  description: z.string().max(100).optional()
})

export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
      success?: boolean
    }
  | undefined

export type SignUpFormState =
  | {
      errors?: {
        firstname?: string[]
        surname?: string[]
        country?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
      success?: boolean
    }
  | undefined

export type EditAccountFormState =
  | {
      errors?: {
        firstname?: string[]
        surname?: string[]
        country?: string[]
      }
      message?: string
      success?: boolean
    }
  | undefined

export const apiURL = 'http://localhost:5188'


export interface ApiLoginResponse {
  success: boolean
  message: string
  token: string
  refreshToken: string
}

export interface ApiGeneralResponse {
  success: boolean
  message: string
}