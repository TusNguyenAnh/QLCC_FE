"use client"

import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import {
    Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem, SidebarProvider, SidebarTrigger
} from "@/components/ui/sidebar.tsx";
import {
    Building,
    Building2,
    ChevronRight,
    FileText,
    Home,
    LogOut,
    Network,
    Settings,
    UserRoundCog,
    Workflow
} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {logoutUser} from "@/apis/authAPI.ts";
import {handleAxiosStatusCode} from "@/utils/request.ts";
import {AuthContext} from "@/context/AuthContext.tsx";

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
        title: "Quản lý quy trình",
        url: "/page/bsn",
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
                url: "/page/apres/res",
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
        id: 10,
        title: "Xử lý yêu cầu",
        url: "/page/reply",
        icon: FileText,
        child: []
    },
    {
        id: 7,
        title: "Cài đặt",
        url: "#",
        icon: Settings,
        child: []
    },
    {
        id: 9,
        title: "Đăng xuất",
        url: "#",
        icon: LogOut,
        child: []
    }

]

export default function SidebarCus() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const {setUser} = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logoutUser();
            // toast.success("Đăng nhập thành công!");
            setUser(null);
            navigate("/login");
        } catch (err) {
            handleAxiosStatusCode(err);
        }
    }

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                <SidebarContent>
                    <SidebarGroup>
                        <div className="flex items-center justify-between">
                            <SidebarGroupLabel hidden={open}>MBS
                            </SidebarGroupLabel>
                            <SidebarTrigger className="p-4" onClick={() => setOpen(prev => !prev)}>
                            </SidebarTrigger>
                        </div>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <Collapsible className="group/collapsible grp" key={item.id}>
                                        <SidebarMenuItem className="mb-1.5">
                                            <CollapsibleTrigger asChild>
                                                {item.title === "Đăng xuất" ?
                                                    (
                                                        <SidebarMenuButton
                                                            className="flex justify-between cursor-pointer"
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                handleLogout();
                                                            }}
                                                        >
                                                            <div className="flex items-center">
                                                                <item.icon className="size-4 mr-1.5"/>
                                                                <span
                                                                    className={open ? "hidden" : "fadeIn block opacity-1"}>{item.title}</span>
                                                            </div>
                                                        </SidebarMenuButton>
                                                    ) : (
                                                        <Link to={item.url}>
                                                            <SidebarMenuButton className="flex justify-between">
                                                                <div className={"flex items-center"}>
                                                                    <item.icon className="size-4 mr-1.5"/>
                                                                    <span
                                                                        className={open ? "hidden" : "fadeIn block opacity-1"}>{item.title}</span>
                                                                </div>

                                                                {item.child.length > 0 && (
                                                                    <ChevronRight className="chevron-rotate"/>)}
                                                            </SidebarMenuButton>
                                                        </Link>
                                                    )}
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
                                                                            <span
                                                                                className={open ? "hidden" : "fadeIn block opacity-1"}>{itemChild.title}</span>
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


