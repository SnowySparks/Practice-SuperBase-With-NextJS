"use client";

import { Button, Input } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function SignUp({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationRequired, setConfirmationRequired] = useState(false); // 회원가입은 성공했고 이메일 인증이 필요할 떄
  const [otp, setOtp] = useState("");

  const supabase = createBrowserSupabaseClient();

  // 회원가입과 관련된
  const signUpMutation = useMutation({
    mutationFn: async () => {
      // signUp 함수 호출
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // 이메일 인증링크 -> /signup/confirm?code=?? 형식으로 보내짐
          emailRedirectTo: `${process.env
            .NEXT_PUBLIC_SERVICE_URL!}/signup/confirm`,
        },
      });
      // 에러 -> 경고
      if (error) {
        alert(error.message);
      }
      // 정상 -> 이메일 인증하라고 요구하기
      if (data) {
        setConfirmationRequired(true);
      }
    },
  });

  // 회원 인증 -> otp인증
  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.verifyOtp({
        type: "signup",
        email,
        token: otp,
      });
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg border border-gray-400 bg-white gap-2">
        <img src={"/images/inflearngram.webp"} className="w-60 mb-6" />
        {confirmationRequired ? (
          <Input
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            label="otp"
            type="number"
            className="w-full rounded-sm"
            placeholder="이메일로 전송된 6자리 숫자를 입력해주세요."
          />
        ) : (
          <>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="email"
              type="email"
              className="w-full rounded-sm"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="password"
              type="password"
              className="w-full rounded-sm"
            />
          </>
        )}
        <Button
          onClick={() => {
            if (confirmationRequired) {
              verifyOtpMutation.mutate();
            } else {
              signUpMutation.mutate();
            }
          }}
          disabled={
            confirmationRequired
              ? verifyOtpMutation.isPending
              : signUpMutation.isPending
          } // -> 회원가입 성공 후 이메일 인증이 필요할 때 버튼 비활성화
          loading={
            confirmationRequired
              ? verifyOtpMutation.isPending
              : signUpMutation.isPending
          }
          color="light-blue"
          className="w-full text-md py-1"
        >
          {confirmationRequired ? "인증하기" : "회원가입"}
        </Button>
      </div>
      <div className="py-4 w-full text-center max-w-lg border border-gray-400 bg-white">
        이미 계정이 있으신가요?{" "}
        <button
          className="text-light-blue-600 font-bold"
          onClick={() => setView("SIGNIN")}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
