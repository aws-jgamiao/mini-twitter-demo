import React, { useState } from "react";
import { logIn, signUp, logOut } from "../firebase/auth";

interface AuthProps {
  setUser: (user: any) => void;
  user: any;
}

const Auth: React.FC<AuthProps> = ({ setUser, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formType, setFormType] = useState<'login' | 'signup'>("login");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const validateInputs = (): boolean => {
    if (!email.includes("@") || !email.includes(".")) {
      setError("Invalid email format.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      if (formType === "login") {
        const loggedInUser = await logIn(email, password);
        setUser(loggedInUser);
      } else {
        const newUser = await signUp(email, password);
        setUser(newUser);
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full space-y-6 p-8">
        {/* Twitter Logo */}
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </div>

        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">
            {formType === "login" ? "Sign in to X" : "Join X today"}
          </h2>
        </div>

        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative rounded-md bg-black">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-4 bg-transparent border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Phone, email, or username"
            />
          </div>

          <div className="relative rounded-md bg-black">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-4 bg-transparent border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-full font-bold bg-white text-black hover:bg-gray-200 transition-colors"
          >
            {formType === "login" ? "Sign in" : "Create account"}
          </button>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full py-3 px-4 rounded-full font-bold border border-gray-700 text-white hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            <button
              type="button"
              className="w-full py-3 px-4 rounded-full font-bold border border-gray-700 text-white hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 384 512">
                <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              <span>Continue with Apple</span>
            </button>
          </div>

          {/* Form Type Toggle */}
          <div className="text-center mt-4">
            <p className="text-gray-500">
              {formType === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setFormType(formType === "login" ? "signup" : "login")}
                className="text-blue-500 hover:text-blue-400"
              >
                {formType === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Sign Out Button (when user is logged in) */}
          {user && (
            <button
              onClick={logOut}
              className="w-full py-3 px-4 rounded-full font-bold bg-red-600 text-white hover:bg-red-700 transition-colors mt-4"
            >
              Sign Out
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;