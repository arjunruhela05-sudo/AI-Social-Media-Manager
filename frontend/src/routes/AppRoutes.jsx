import { Routes, Route } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";

import Hero from "../Components/Hero";

import Brands from "../Pages/Brands";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Features from "../Pages/Features";
import Pricingpage from "../Pages/Pricingpage";
import Template from "../Pages/Template";
import Integrations from "../Pages/Integrations";
import Demo from "../Pages/Demo";

import Dashboard from "../Pages/Dashboard";
import Schedule from "../Pages/Schedule";
import ContentHistory from "../Pages/ContentHistory";
import Replies from "../Pages/Replies";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* =========================
          PUBLIC ROUTES
      ========================= */}

      <Route element={<MainLayout />}>

        <Route path="/" element={<Hero />} />

        <Route
          path="/features"
          element={<Features />}
        />

        <Route
          path="/integrations"
          element={<Integrations />}
        />

        <Route
          path="/pricing"
          element={<Pricingpage />}
        />

        <Route
          path="/templates"
          element={<Template />}
        />

        <Route
          path="/demo"
          element={<Demo />}
        />

      </Route>


      {/* =========================
          AUTH ROUTES
      ========================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />


      {/* =========================
          PROTECTED ROUTES
      ========================= */}

      <Route element={<ProtectedRoute />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/brands"
          element={<Brands />}
        />

        <Route
          path="/schedule"
          element={<Schedule />}
        />

        <Route
          path="/content-history"
          element={<ContentHistory />}
        />

        <Route
          path="/replies"
          element={<Replies />}
        />

      </Route>

    </Routes>
  );
}