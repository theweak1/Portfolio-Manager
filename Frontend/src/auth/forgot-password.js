import React, { useState } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";

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
    <div>
      <div>
        <h1>Reset Password</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send Reset Password Link</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
