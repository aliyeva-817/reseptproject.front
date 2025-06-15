import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import styles from './Login.module.css';
import { setUser } from '../../redux/reducers/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ⛔ Əgər qeydiyyat yoxdursa, istifadəçini register səhifəsinə yönləndir
  useEffect(() => {
    const isRegistered = localStorage.getItem('isRegistered');
    if (!isRegistered) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/auth/login', { email, password });

      dispatch(setUser(res.data.user));
      localStorage.setItem('accessToken', res.data.access);

      navigate('/home');
    } catch (err) {
      alert('Email və ya şifrə yanlışdır');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Daxil Ol</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Şifrə" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Daxil ol</button>
      </form>
    </div>
  );
};

export default Login;
