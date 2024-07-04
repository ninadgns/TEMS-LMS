'use client';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/utils/supabase/client';
import { redirect, useRouter } from 'next/navigation';
// import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache';
import { login } from './actions';

const loginFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export default function LoginForm() {
	const router = useRouter();
	const supabase = createClient();
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});



	const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
		console.log(values);

		const formSubmissionPromise = new Promise(async (resolve, reject) => {
			try {
				const loginResult = await login(values);

				if (loginResult.status === 'success') {
					resolve(loginResult.message);
				} else {
					reject(loginResult.message);
				}
			} catch (error) {
				console.log(error);
				reject('Some unexpected error happened, please try again');
			}
		});

		toast.promise(formSubmissionPromise, {
			loading: 'Logging in...',
			success: (data: any) => {
				form.reset();
				setTimeout(() => {
					router.push('/');
				}, 500);
				return data;
			},
			error: (err) => {
				form.reset();
				return err;
			},
		});
	};

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="example@gmail.com"
											{...field}
											type="email"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input {...field} type="password" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							Sign in
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
		// <form>
		// 	<label htmlFor="email">Email:</label>
		// 	<input id="email" name="email" type="email" required />
		// 	<label htmlFor="password">Password:</label>
		// 	<input id="password" name="password" type="password" />
		// 	<button formAction={login}>Log in</button>
		// 	<button formAction={signup}>Sign up</button>
		// 	<button formAction={forgotPassword}>Forgot Password</button>
		// </form>
	);
}
