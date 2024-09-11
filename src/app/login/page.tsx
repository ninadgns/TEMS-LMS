import Logo from "@/assets/logo.png";


import Image from "next/image";
import LoginForm from "./LoginForm";

export default function Page() {
  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <div className="hidden bg-muted lg:block bg-green-300">
        <div className="h-full flex flex-col items-center justify-between py-6">
          <Image
            alt="Logo"
            className="mb-4 aspect-content overflow-hidden rounded-full object-cover"
            height="250"
            src={Logo}
            width="250"
          />
          <div className="flex flex-col justify-center space-y-4 pb-40">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-green-700 dark:text-green-300 sm:text-5xl xl:text-6xl/none">
                TEMS LMS
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-400">
                <b>Learning Management System</b> for TEMS Academy of Olympiad Math</p>
            </div>
          </div>
          <div>
            <p className="text-gray-500">
              TEMS @ 2024
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex h-screen items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
