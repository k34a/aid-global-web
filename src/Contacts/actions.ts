'use server'


import { supabase } from '../lib/supabase'


export async function handleContactForm(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { success: false, error: 'Missing required fields' }
  }

  const { error } = await supabase.from('contacts').insert([
    { name, email, message },
  ])

  if (error) {
    console.error('Error saving contact:', error.message)
    return { success: false, error: error.message }
  }

  return { success: true }
}
