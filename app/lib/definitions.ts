
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
export const VerifyPasswordSchema = z.object({
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

export const apiURL = process.env.API_URL


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

export interface Song{
  id:string,
  name:string,
  artists:Artist[],
  albumId:string,
  albumName:string,
  duration:string,
  imageUrl?:string,
  audioUrl?:string,
  releaseDate?:string,
  genres:Genre[],
  lyrics?:string,
  plays:number,
  writerName?:string,
  producer?:string,
  recordLabel?:string
  isOnLibrary: boolean
}


export interface Artist{
  id:string,
  name:string,
  description?:string
  imageUrl?:string,
  topSongs?:Song[],
  albums?:Album[]

}

export interface Album{
  id:string,
  name:string,
  pictureUrl:string,
  releaseDate:string,
  songs?:Song[]
  artistId:string,
  artistName:string
}

export interface Genre{
  id:string,
  name:string,
  color:string,
  description?:string,
  songs:Song[]
}

export interface Playlist{
  id:string,
  name:string,
  imageUrl:string
  userId:string,
  userName:string,
  isPublic:boolean
  description?:string,
  songs?:Song[]
}

export function isNullOrEmpty(value: string | null | undefined): boolean {
  return !value || value.trim().length === 0;
}

export const defaultSongImage = 'https://res.cloudinary.com/dw43hgf5p/image/upload/v1735748260/uh7bimgulcqxvdpu91t8.jpg'