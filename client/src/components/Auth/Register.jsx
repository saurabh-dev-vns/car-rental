import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./Firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user); // Log the user object if logged in
        navigate("/"); // Redirect to /home if logged in
      } else {
        console.log("User is not logged in."); // Log when there is no user
      }
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, [navigate]);
  

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google signed-in user:", result.user);
      alert("Signed in with Google successfully!");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError(error.message);
    }
  };

  // Email/Password Registration Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("Registered user:", userCredential.user);
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          value={formData.email}
          placeholder="Enter email"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
          style={styles.input}
        />
        <input
          type="password"
          value={formData.password}
          placeholder="Enter password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          style={styles.input}
        />
        <input
          type="password"
          value={formData.confirmPassword}
          placeholder="Confirm password"
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          required
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
      <p style={styles.or}>OR</p>
      <button onClick={handleGoogleSignIn} style={styles.googleButton}>
        Sign in with Google
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  googleButton: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#DB4437",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  or: {
    margin: "10px 0",
    fontSize: "14px",
    color: "#666",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default Register;
