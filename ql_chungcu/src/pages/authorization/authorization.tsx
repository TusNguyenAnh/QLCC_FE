import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Shield, Lock, Users} from "lucide-react";
import {RoleManagement} from "@/pages/authorization/role/role-management.tsx";
import UserManagement from "@/pages/authorization/user/user-management.tsx";
import PermissionManagement from "@/pages/authorization/permission/permission-management.tsx";

function Authorization() {
    return (
        <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="role" className="h-full flex flex-col">
                <TabsList className="mx-6 mt-4 w-fit">
                    <TabsTrigger value="role">
                        <Shield className="h-4 w-4"/>
                        <span className="hidden sm:inline">Vai trò</span>
                    </TabsTrigger>
                    <TabsTrigger value="permssion">
                        <Lock className="h-4 w-4"/>
                        <span className="hidden sm:inline">Quyền hạn</span>
                    </TabsTrigger>
                    <TabsTrigger value="user">
                        <Users className="h-4 w-4"/>
                        <span className="hidden sm:inline">Người dùng</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="role" className="flex-1 p-6 space-y-6">
                    <RoleManagement/>
                </TabsContent>

                <TabsContent value="permssion" className="flex-1 p-6">
                    <PermissionManagement/>
                </TabsContent>

                <TabsContent value="user" className="flex-1 p-6">
                    <UserManagement/>
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default Authorization;

