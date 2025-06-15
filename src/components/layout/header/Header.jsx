import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <h1>HTH</h1>
      <nav>
        <Link to="/home">Əsas səhifə</Link>
        <Link to="/add">Resept əlavə et</Link>
        <Link to="/profile">Profil</Link>
        <Link to="/favorites">Favoriler</Link>
        <button onClick={handleLogout}>Çıxış</button>
      </nav>
    </header>
  );
};

export default Header;
