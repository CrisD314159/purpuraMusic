import {z} from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .trim(),
})
export const SignUpFormSchema = z.object({
  name :z.string().min(3).max(30),
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
  name :z.string().min(3).max(30)
})
export const CreatePlayListFormSchema = z.object({
  imageUrl :z.string().url().optional(),
  name :z.string().min(2).max(30),
  description: z.string().max(100).optional()
})
export const UpdatePlayListFormSchema = z.object({
  id: z.string(),
  imageUrl :z.string().url().optional(),
  name :z.string().min(2).max(30),
  description: z.string().max(100).optional()
})
export const ChangePasswordSchema = z.object({
  email: z.string().email(),
  code :z.string(),
  password: z
      .string({message: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*-?&).'})
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-])[A-Za-z\d@$!%*?&\-]{8,}$/)
})