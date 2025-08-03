"use client"

import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import {
    Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem, SidebarProvider
} from "@/components/ui/sidebar.tsx";
import {Building, Building2, ChevronRight, Home, Network, Settings, UserRoundCog, Workflow} from "lucide-react";
import {Link} from "react-router-dom";

const items = [
    {
        id: 1,
        title: "Trang chủ",
        url: "/",
        icon: Home,
        child: []
    },
    {
        id: 2,
        title: "Quản lý cơ cấu tổ chức",
        url: "/page/org",
        icon: Network,
        child: []
    },
    {
        id: 3,
        title: "Quản lý nghiệp vụ",
        url: "/",
        icon: Workflow,
        child: []
    },

    {
        id: 8,
        title: "Quản lý tòa nhà",
        url: "/page/bd",
        icon: Building2,
        child: []
    },

    {
        id: 4,
        title: "Cư dân căn hộ",
        url: "#",
        icon: Building,
        child: [
            {
                id: 5,
                title: "Quản lý cư dân",
                url: "#",
                icon: UserRoundCog,
                child: []
            },
            {
                id: 6,
                title: "Quản lý căn hộ",
                url: "/page/apres/apt",
                icon: Home,
                child: []
            }
        ]
    },
    {
        id: 7,
        title: "Cài đặt",
        url: "#",
        icon: Settings,
        child: []
    }

]

export default function SidebarCus() {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>MBS</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <Collapsible className="group/collapsible grp" key={item.id}>
                                        <SidebarMenuItem className="mb-1.5">
                                            <CollapsibleTrigger asChild>
                                                <Link to={item.url}>
                                                    <SidebarMenuButton className="flex justify-between">
                                                        <div className="flex items-center">
                                                            <item.icon className="size-4 mr-1.5"/>
                                                            <span>{item.title}</span>
                                                        </div>

                                                        {item.child.length > 0 && (
                                                            <ChevronRight className="chevron-rotate"/>)}
                                                    </SidebarMenuButton>
                                                </Link>
                                            </CollapsibleTrigger>
                                            {item.child.length > 0 && (
                                                <CollapsibleContent className="CollapsibleContent">
                                                    <SidebarMenuSub>
                                                        {item.child.map((itemChild) => (
                                                            <SidebarMenuSubItem className="mt-1" key={itemChild.id}>
                                                                <Link to={itemChild.url}>
                                                                    <SidebarMenuButton
                                                                        className="flex justify-between">
                                                                        <div className="flex items-center">
                                                                            <itemChild.icon className="size-4 mr-1.5"/>
                                                                            <span>{itemChild.title}</span>
                                                                        </div>
                                                                    </SidebarMenuButton>
                                                                </Link>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            )}
                                        </SidebarMenuItem>
                                    </Collapsible>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    )
}


