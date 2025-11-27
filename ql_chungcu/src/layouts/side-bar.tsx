"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar.tsx";
import { ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {useContext, useMemo, useState} from "react";
import { logoutUser } from "@/apis/authAPI.ts";
import { handleAxiosStatusCode } from "@/utils/request.ts";
import { removeToken } from "@/utils/auth.ts";
import { menuItems } from "@/types/Menu.ts";
import type { MenuItem } from "@/types/Menu.ts";
import {AuthContext} from "@/context/AuthContext.tsx";

export default function SidebarCus() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { clearAuth, hasAnyPermission, hasAllPermissions } = useContext(AuthContext);

  // Filter menu items based on permissions
  const checkItemPermission = (item: MenuItem): boolean => {
    if (!item.permissions || item.permissions.length === 0) return true;

    return item.requireAll
      ? hasAllPermissions(item.permissions)
      : hasAnyPermission(item.permissions);
  };


  const handleLogout = async () => {
    try {
      await logoutUser();
      removeToken();
      clearAuth();
      navigate("/login", { replace: true });
    } catch (err) {
      handleAxiosStatusCode(err);
    }
  };

  // Filter menu với child items
  const visibleItems = useMemo(() => {
    return menuItems
      .map((item) => ({
        ...item,
        child: item.child.filter(checkItemPermission),
      }))
      .filter((item) => {
        // Hiển thị nếu: có quyền HOẶC có ít nhất 1 child visible
        return checkItemPermission(item) || item.child.length > 0;
      });
  }, [hasAnyPermission, hasAllPermissions]); // Re-calculate khi permissions thay đổi vi 2 ham này phụ thuộc vào chúng o trong AuthContext

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <div className="flex items-center justify-between">
              <SidebarGroupLabel hidden={open}>MBS</SidebarGroupLabel>
              <SidebarTrigger
                className="p-4"
                onClick={() => setOpen((prev) => !prev)}
              ></SidebarTrigger>
            </div>
            <SidebarGroupContent>
              <SidebarMenu>
                {visibleItems.map((item) => (
                  <Collapsible className="group/collapsible grp" key={item.id}>
                    <SidebarMenuItem className="mb-1.5">
                      <CollapsibleTrigger asChild>
                        {item.title === "Đăng xuất" ? (
                          <SidebarMenuButton
                            className="flex justify-between cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLogout();
                            }}
                          >
                            <div className="flex items-center">
                              <item.icon className="size-4 mr-1.5" />
                              <span
                                className={
                                  open ? "hidden" : "fadeIn block opacity-1"
                                }
                              >
                                {item.title}
                              </span>
                            </div>
                          </SidebarMenuButton>
                        ) : (
                          <Link to={item.url}>
                            <SidebarMenuButton className="flex justify-between">
                              <div className={"flex items-center"}>
                                <item.icon className="size-4 mr-1.5" />
                                <span
                                  className={
                                    open ? "hidden" : "fadeIn block opacity-1"
                                  }
                                >
                                  {item.title}
                                </span>
                              </div>

                              {item.child.length > 0 && (
                                <ChevronRight className="chevron-rotate" />
                              )}
                            </SidebarMenuButton>
                          </Link>
                        )}
                      </CollapsibleTrigger>
                      {item.child.length > 0 && (
                        <CollapsibleContent className="CollapsibleContent">
                          <SidebarMenuSub>
                            {item.child.map((itemChild) => (
                              <SidebarMenuSubItem
                                className="mt-1"
                                key={itemChild.id}
                              >
                                <Link to={itemChild.url}>
                                  <SidebarMenuButton className="flex justify-between">
                                    <div className="flex items-center">
                                      <itemChild.icon className="size-4 mr-1.5" />
                                      <span
                                        className={
                                          open
                                            ? "hidden"
                                            : "fadeIn block opacity-1"
                                        }
                                      >
                                        {itemChild.title}
                                      </span>
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
  );
}
