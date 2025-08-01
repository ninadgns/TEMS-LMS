"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { Database } from "@/utils/supabase/database.types";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
        message: "Successfully logged in. Please wait while we redirect you to dashboard."
    }
}

export async function signup(formData: FormData) {

    const supabase = createClient();
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        console.log(error);
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
}

export async function forgotPassword(formData: FormData) {
    const supabase = createClient();
    const email = formData.get("email") as string;
    console.log(email);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/update-password",
    });
}

export async function resetPassword(formData: FormData) {
    const supabase = createClient();
    const password = formData.get("password") as string;
    const { data, error } = await supabase.auth.updateUser({
        password: password,
    });
}
