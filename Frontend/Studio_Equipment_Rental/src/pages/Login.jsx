import { useState, useEffect } from "react";
import { auth } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      },
    );
  };

  const sendOtp = async () => {
    try {
      setupRecaptcha();

      let formattedPhone = phone;
      if (!phone.startsWith("+")) {
        formattedPhone = "+91" + phone;
      }

      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier,
      );

      window.confirmationResult = confirmation;
      alert("OTP Sent ✅");
    } catch (err) {
      console.error(err);
      alert("OTP Error ❌");
    }
  };

  const verifyOtp = async () => {
    try {
      const result = await window.confirmationResult.confirm(otp);
      const token = await result.user.getIdToken();

      const res = await axios.post("http://127.0.0.1:8000/api/auth/phone/", {
        token,
      });

      localStorage.setItem("access", res.data.tokens.access);

      alert("Phone Login Success ✅");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid OTP ❌");
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const token = await result.user.getIdToken();

      const res = await axios.post("http://127.0.0.1:8000/api/auth/google/", {
        token,
      });

      localStorage.setItem("access", res.data.tokens.access);

      alert("Google Login Success ✅");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Google Login Failed ❌");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue</p>

        {/* Phone */}
        <div className="input-group">
          <input
            type="text"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <label>Phone Number</label>
        </div>

        <button className="primary-btn" onClick={sendOtp}>
          Send OTP
        </button>

        {/* OTP */}
        <div className="input-group">
          <input
            type="text"
            required
            onChange={(e) => setOtp(e.target.value)}
          />
          <label>Enter OTP</label>
        </div>

        <button className="primary-btn" onClick={verifyOtp}>
          Verify & Login
        </button>

        <div id="recaptcha-container"></div>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="secondary-btn" onClick={googleLogin}>
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
