import React from "react";

import SidebarCus from "@/layouts/side-bar.tsx";
import Header from "@/layouts/header.tsx";
import {Toaster} from "sonner";

interface MyComponentProps {
    content: React.ReactNode;
}

export function MainLayout({content}: MyComponentProps) {
    return (
        <div className="flex">
            <div>
                <SidebarCus/>
            </div>
            <div className="flex-1">
                <div className="p-4 border-b border-gray-300">
                    <Header/>
                </div>
                <div className="px-4 mt-8">
                    {content}
                    <Toaster position="bottom-left"  richColors/>
                </div>
            </div>
        </div>
    );
}

export default MainLayout
