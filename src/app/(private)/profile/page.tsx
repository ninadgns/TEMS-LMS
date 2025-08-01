"use client"
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React from "react"

export default function Profile() {
    const router = useRouter();
    return (
        <div>
            <Button onClick={async () => {
                const supabase = createClient();
                const { error } = await supabase.auth.signOut()
                if (error) console.log(error);
                else router.push("/login")
            }}>Log Out</Button>
        </div>
    )
};

