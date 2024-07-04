'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod';

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export async function login(values: z.infer<typeof loginFormSchema>) {
    const supabase = createClient();
    const loginData = {
        email: values.email,
        password: values.password,
    };

    const { data, error } = await supabase.auth.signInWithPassword(loginData);

    if (error) {
        console.log(error);

        return {
            status: "failed",
            message: "Wrong Email or Password"
        }
    }

    return {
        status: "success",
        message: "Successfully logged in"
    }
}

export async function signup(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}