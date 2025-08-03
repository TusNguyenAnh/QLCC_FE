import React from 'react';
import {Routes, Route} from "react-router-dom";

import MainLayout from "@/layouts/main-layout.tsx";
import Organization from "@/pages/organization/organization.tsx";
import Apartment from "@/pages/apartment/apartment.tsx";
import {Building} from "@/pages/building/building.tsx";

const AppRouter: React.FC = () => (
    <Routes>
        <Route path="/" element={
            <MainLayout content={undefined}>
            </MainLayout>
        }/>

        <Route path="/page/org" element={
            <MainLayout content={<Organization/>}>
            </MainLayout>
        }/>

        <Route path="/page/bd" element={
            <MainLayout content={<Building/>}>
            </MainLayout>
        }/>

        <Route path="/page/apres/apt" element={
            <MainLayout content={<Apartment/>}>
            </MainLayout>
        }/>

    </Routes>
);
export default AppRouter;
