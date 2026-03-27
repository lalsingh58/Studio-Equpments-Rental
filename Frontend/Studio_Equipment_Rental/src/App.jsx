import { useState } from "react";
import { auth } from "./firebase";
import axios from "axios";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function App() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  // Setup Recaptcha
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth,
    );
  };

  // Send OTP
  const sendOtp = async () => {
    try {
      setupRecaptcha();

      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier,
      );

      window.confirmationResult = confirmation;
      alert("OTP Sent");
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    try {
      const result = await window.confirmationResult.confirm(otp);
      const token = await result.user.getIdToken();

      await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        token: token,
      });

      alert("Login Success");
    } catch (err) {
      console.error(err);
      alert("Invalid OTP");
    }
  };

  // Google Login
  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const token = await result.user.getIdToken();

      await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        token: token,
      });

      alert("Google Login Success");
    } catch (err) {
      console.error(err);
      alert("Google Login Failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Studio Equipment Rental</h2>

      {/* Phone Login */}
      <input
        placeholder="Enter phone (+91...)"
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

      {/* Google Login */}
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  );
}

export default App;
