import React, { useState } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useLocation, useNavigate } from "react-router-dom";
import resetpassword from '../assets/reset-password.png'

const UpdatePasswordPage = () => {
  const [password, setPassword] = useState("");
  const { error, sendRequest } = useHttpClient();
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token"); // Retrieve the token from the URL query parameters

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token in the request header
    };

    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/auth/resetPassword`,
      "POST",
      JSON.stringify({ password }),
      headers
    );

    if (responseData.ok) {
      alert("Password updated successfully.");
      navigate("/login");
    } else {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={resetpassword} alt="" />
      </div>
  
      <div className="bg-darkGrey flex flex-col justify-center">
        <div className="bg-darkGrey px-8 py-4">
          <h1 className="text-4xl text-white font-bold text-center pb-52">Update Password</h1>
        </div>
        <form className="max-w-[400px] w-full mx-auto bg-white rounded-lg shadow-lg p-8" onSubmit={handleSubmit}>
          <div className="flex flex-col py-2">
            <label htmlFor="password" className="text-lg font-semibold">
              New Password:
            </label>
            <input
              className="rounded-lg bg-grey mt-2 p-2  border-black"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full my-5 py-2 bg-yellow shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/40 text-black font-semibold rounded-lg" type="submit">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
  

};

export default UpdatePasswordPage;
