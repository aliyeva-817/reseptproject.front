import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import axiosInstance from "../../services/axiosInstance";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axiosInstance.post("/auth/register", form);

    const loginRes = await axiosInstance.post("/auth/login", {
      email: form.email,
      password: form.password,
    });

    localStorage.setItem("accessToken", loginRes.data.access);
    localStorage.setItem("isRegistered", "true"); // İSTİFADƏÇİ QEYDİYYATDAN KEÇİB

    navigate("/home");
  } catch (err) {
    console.error("Xəta detalları:", err.response?.data || err.message);
    alert("Qeydiyyat və ya login zamanı xəta baş verdi");
  }
};



  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Qeydiyyat</h2>
        <input type="text" name="name" placeholder="Ad" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Şifrə" onChange={handleChange} />
        <button type="submit">Qeydiyyatdan keç</button>
      </form>
    </div>
  );
};

export default Register;
