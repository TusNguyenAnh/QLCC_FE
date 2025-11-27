import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/main-layout.tsx";
import Organization from "@/pages/organization/organization.tsx";
import Apartment from "@/pages/apartment/apartment.tsx";
import { Building } from "@/pages/building/building.tsx";
import { Resident } from "@/pages/resident/resident.tsx";
import { Login } from "@/pages/authentication/login.tsx";
import { ProtectedRoute } from "@/layouts/protected-route";
import BusinessProcess from "@/pages/business/business-process.tsx";
import Reply from "@/pages/replies/reply.tsx";
import LandingPage from "@/pages/home/landing-page.tsx";
import { RegisterService } from "@/pages/authentication/register-service.tsx";
import NotFound from "@/layouts/not-found.tsx";
import Authorization from "@/pages/authorization/authorization.tsx";

const AppRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />

    <Route path="/page/register-service" element={<RegisterService />} />

    <Route
      path="/page/dashboard"
      element={
        <ProtectedRoute>
          <MainLayout content={null}></MainLayout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/page/org"
      element={
        <ProtectedRoute
          permissions={["view:organization", "manage:organization"]}
          requireAll={true}

        >
          <MainLayout content={<Organization />} />
        </ProtectedRoute>
      }
    />

      <Route path="/page/authori" element={
          <ProtectedRoute
              permissions={["view:permission", "assign:permission", "manage:role", "view:role", "assign:role", "view:user", "manage:user"]}
              requireAll={true}
          >
              <MainLayout content={<Authorization/>}>
              </MainLayout>
          </ProtectedRoute>
      }/>

    <Route
      path="/page/bd"
      element={
        <ProtectedRoute permissions={["view:building"]}>
          <MainLayout content={<Building />} />
        </ProtectedRoute>
      }
    />

    <Route
      path="/page/apres/apt"
      element={
        <ProtectedRoute permissions={["view:apartment"]}>
          <MainLayout content={<Apartment />} />
        </ProtectedRoute>
      }
    />

    <Route
      path="/page/apres/res"
      element={
        <ProtectedRoute permissions={["view:resident"]}>
          <MainLayout content={<Resident />} />
        </ProtectedRoute>
      }
    />

    <Route
      path="/page/bsn"
      element={
        <ProtectedRoute permissions={["view:workflow"]}>
          <MainLayout content={<BusinessProcess />} />
        </ProtectedRoute>
      }
    />

    <Route
      path="/page/reply"
      element={
        <ProtectedRoute permissions={["view:task"]}>
          <MainLayout content={<Reply />} />
        </ProtectedRoute>
      }
    />

    <Route path="/login" element={<Login />} />

    {/* 404 - Phải đặt cuối cùng */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
export default AppRouter;
