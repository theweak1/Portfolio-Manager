import React, { useState } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useLocation, useNavigate } from "react-router-dom";

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
    <div>
      <h1>Update Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default UpdatePasswordPage;
