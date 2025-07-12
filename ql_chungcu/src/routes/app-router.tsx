import React from 'react';
import {Routes, Route} from "react-router-dom";

import MainLayout from "@/layouts/main-layout.tsx";
import Organization from "@/pages/organization/organization.tsx";

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

    </Routes>
);
export default AppRouter;
