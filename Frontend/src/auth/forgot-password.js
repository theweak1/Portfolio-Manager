import React, { useState } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import forgotPassword from '../assets/forgot-password.jpg';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { error, sendRequest } = useHttpClient();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/auth/forgotPassword`,
      "POST",
      JSON.stringify({ email }),
      { "content-type": "application/json" }
    );

    if (responseData.ok) {
      alert("Email has been sent to rest password.");
      navigate("/");
    } else {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
    <div className="hidden sm:block">
      <img className="w-full h-full object-cover" src={forgotPassword} alt="" />
    </div>
  
    <div className="bg-darkGrey flex flex-col justify-center">
      <div className="bg-darkGrey px-8 py-4">
        <h1 className="text-4xl text-white font-bold text-center pb-52">Reset Password</h1>
      </div>
      <form className="max-w-[400px] w-full mx-auto bg-white rounded-lg shadow-lg p-8" onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <label htmlFor="email" className="text-lg font-semibold">
            Email:
          </label>
          <input
            className="rounded-lg bg-grey mt-2 p-2 border-black"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="w-full my-5 py-2 bg-yellow shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/40 text-black font-semibold rounded-lg" type="submit">
          Send Reset Password Link
        </button>
      </form>
    </div>
  </div>
  
  );
};

export default ResetPasswordPage;
