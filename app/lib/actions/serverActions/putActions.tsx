'use server'

import { ApiGeneralResponse, EditAccountFormSchema, EditAccountFormState } from "../../definitions"
import { EditAccountFetch } from "../requests/putApiRequests"

export async function EditAccount(state: EditAccountFormState, formdata: FormData){
  const formVaildation = EditAccountFormSchema.safeParse({
    firstname: formdata.get('firstname'),
    surname: formdata.get('surname'),
    country: parseInt(formdata.get('country')?.toString() || 'NaN')
  })

  if(!formVaildation.success){
    return {
      success: false,
      errors: formVaildation.error.flatten().fieldErrors
    }
  }

  const {firstname, surname, country} = formVaildation.data

  const response = await EditAccountFetch(firstname, surname, country)

  const {success, message} : ApiGeneralResponse = response

  if(!success){
    return {
      success:false,
      message
    }
  }else{
    return {
      success: true,
      message
    }
  }
}