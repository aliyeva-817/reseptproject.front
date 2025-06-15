import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import AddRecipe from "../pages/add/AddRecipe";
import RecipeDetail from "../pages/recipe/RecipeDetail";
import Favorites from "../pages/favorites/Favorites"; // ✅ əlavə et
import Layout from "../components/layout/Layout";

const isLoggedIn = !!localStorage.getItem("accessToken");
const isRegistered = !!localStorage.getItem("isRegistered");

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : isRegistered ? (
              <Navigate to="/login" />
            ) : (
              <Register />
            )
          }
        />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />

        {/* Yalnız login olunmuş istifadəçilər Layout daxilində səhifələri görür */}
        {isLoggedIn && (
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<AddRecipe />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/favorites" element={<Favorites />} /> {/* ✅ əlavə et */}
          </Route>
        )}

        {/* Əks halda ana səhifəyə yönləndir */}
        {!isLoggedIn && (
          <>
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/add" element={<Navigate to="/" />} />
            <Route path="/recipe/:id" element={<Navigate to="/" />} />
            <Route path="/favorites" element={<Navigate to="/" />} /> {/* ✅ blokla */}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
