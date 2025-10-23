import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "@/context/AuthContext.tsx";


type ComponentProps = {
    children: React.ReactNode;
    roles?: string[]; // Danh sách role được phép truy cập
}

export function ProtectedRoute({children, roles}: ComponentProps) {
    const {user} = useContext(AuthContext);

    if (!user) return <Navigate to="/login" replace/>;

    return children;
}
