// app/signup/confirm/route.ts

import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "utils/supabase/server";

// 이메일 인증링크 클릭 할 때 해당 페이지로 이동
// 여기서 GET 함수 실행 -> 코드를 읽어와서 인증 시도
//

// localhost:3000/signup/confirm?code=???
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.exchangeCodeForSession(code);
    // -> 이메일 인증 성공 시 세션을 발급받아 로그인 처리
  }

  //   localhost:3000
  return NextResponse.redirect(requestUrl.origin);
}
