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

function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  // Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  // 🔐 Setup Recaptcha
  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("Recaptcha Verified");
        },
      },
    );
  };

  // 📱 Send OTP
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

  // 📱 Verify OTP
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

  // 🔵 Google Login
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
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login Page</h2>

      {/* 📱 Phone Login */}
      <input
        placeholder="Enter phone"
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />
      <br />

      <button onClick={sendOtp}>Send OTP</button>

      <br />
      <br />

      <input placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} />
      <br />
      <br />

      <button onClick={verifyOtp}>Verify OTP</button>

      <div id="recaptcha-container"></div>

      <hr />

      {/* 🔵 Google Login */}
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  );
}

export default Login;
