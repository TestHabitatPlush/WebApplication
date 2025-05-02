"use client";
import AuthPageContainer from "@/components/containers/AuthPageContainer";
import Input from "@/components/shared/Input";
import AuthHandler from "@/handlers/AuthHandler";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
  const { loginHandler } = AuthHandler();
  useAuthRedirect("/");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    loginHandler(loginForm);
  };

  const onFormChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full bg-opacity rounded-3xl md:mt-0 sm:max-w-md xl:p-0 text-white">
      <div className="p-6 space-y-5 md:space-y-8 md:p-10">
        <div className="text-black space-y-2">
          <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
            Sign In to your Account
          </h1>
          <p className="text-center text-gray-500 text-sm">
            Lets get started with your account{" "}
          </p>
        </div>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            value={loginForm.email}
            onChange={onFormChange}
            className="rounded-xl mt-1 border-none"
            placeholder="Enter Your Email"
            size="lg"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={loginForm.password}
            onChange={onFormChange}
            className="rounded-xl mt-1"
            placeholder="Enter Your Password"
            size="lg"
          />

          <div>
            <button
              type="submit"
              className="w-full bg-turquoise hover:bg-opacity-90 font-medium rounded-md text-sm px-5 py-3 text-center focus:outline-none"
            >
              LOGIN
            </button>
          </div>
          <p className="text-sm font-light text-center text-gray-700">
            Forgot your password?{" "}
            <Link
              href="/resetpassword"
              className="font-medium text-primary-600 hover:underline underline"
            >
              Reset password
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const Login = () => {
  return (
    <AuthPageContainer>
      <LoginForm />
    </AuthPageContainer>
  );
};

export default Login;
