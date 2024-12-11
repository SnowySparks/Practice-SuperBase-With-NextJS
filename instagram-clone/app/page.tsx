import LogoutButton from "components/logout-button";
import { Metadata } from "next";
import { createServerSupabaseClient } from "utils/supabase/server";

export const metadata: Metadata = {
  title: "Inflearngram",
  description: "Instagram clone project",
};

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();

  return (
    <main className="w-full h-screen flex flex-col gap-2 items-center justify-center">
      <h1 className="font-bold text-xl">
        {/* 이메일의 골뱅이 앞 부분만 때어서 보여주기 */}
        Welcome {data?.user?.email?.split("@")?.[0]}!
      </h1>
      <LogoutButton />
    </main>
  );
}
