import React from 'react';
import {Routes, Route} from "react-router-dom";

import MainLayout from "@/layouts/main-layout.tsx";
import Organization from "@/pages/organization/organization.tsx";
import Apartment from "@/pages/apartment/apartment.tsx";
import {Building} from "@/pages/building/building.tsx";
import {Resident} from "@/pages/resident/resident.tsx";
import {Login} from "@/pages/authentication/login.tsx";
import {ProtectedRoute} from '@/layouts/protected-route';
import BusinessProcess from "@/pages/business/business-process.tsx";
import Reply from "@/pages/replies/reply.tsx";

const AppRouter: React.FC = () => (
    <Routes>
        <Route path="/" element={
            <MainLayout content={undefined}>
            </MainLayout>
        }/>

        {/*<Route path="/page/org" element={*/}
        {/*    <ProtectedRoute>*/}
        {/*        <MainLayout content={<Organization/>}>*/}
        {/*        </MainLayout>*/}
        {/*    </ProtectedRoute>*/}
        {/*}/>*/}

        <Route path="/page/bd" element={
            <ProtectedRoute>
                <MainLayout content={<Building/>}/>
            </ProtectedRoute>
        }/>

        <Route path="/page/apres/apt" element={
            <MainLayout content={<Apartment/>}>
            </MainLayout>
        }/>

        <Route path="/page/apres/res" element={
            <MainLayout content={<Resident/>}>
            </MainLayout>
        }/>

        <Route path="/page/bsn" element={
            <MainLayout content={<BusinessProcess/>}>
            </MainLayout>
        }/>

        <Route path="/page/reply" element={
            <MainLayout content={<Reply/>}>
            </MainLayout>
        }/>

        <Route path="/login" element={
            <Login/>
        }/>

    </Routes>
);
export default AppRouter;
