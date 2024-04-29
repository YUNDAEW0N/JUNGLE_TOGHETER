import React, { useRef } from 'react';

interface SignInProps {
  onSubmit: (formData: SignIpForm) => void;
}

interface SignIpForm {
  useremail: string;
  password: string;
}

export default function SignIn({ onSubmit }: SignInProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const useremailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const useremail = useremailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!useremail || !password) {
      return;
    }

    const formData = {
      useremail,
      password,
    };

    onSubmit(formData);
    // formRef.current.reset();
  };
  return (
    <div>
      <form ref={formRef}>
        <input
          id="id"
          type="id"
          ref={useremailRef}
          placeholder="Id"
          autoComplete="off"
          required
        />

        <input
          id="password"
          type="password"
          ref={passwordRef}
          placeholder="Password"
          required
        />

        <button onClick={submitForm}>로그인</button>
      </form>
    </div>
  );
}
