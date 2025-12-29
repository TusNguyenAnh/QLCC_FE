import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import UserOrgManagement from "@/pages/authorization/user/org/user-org-management.tsx";
import UserResManagement from "@/pages/authorization/user/res/user-res-management.tsx";
import UserStaffManagement from "@/pages/authorization/user/management/user-staff-management.tsx";


function UserManagement() {
    return (
        <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="org" className="h-full flex flex-col">
                <TabsList className="mx-6 mt-4 w-fit">
                    <TabsTrigger value="org">
                        <span className="hidden sm:inline">Ban quản trị</span>
                    </TabsTrigger>
                    <TabsTrigger value="management">
                        <span className="hidden sm:inline">Ban quản lý</span>
                    </TabsTrigger>
                    <TabsTrigger value="res">
                        <span className="hidden sm:inline">Cư dân</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="org" className="flex-1 p-6 space-y-6">
                    <UserOrgManagement/>
                </TabsContent>

                <TabsContent value="management" className="flex-1 p-6 space-y-6">
                    <UserStaffManagement/>
                </TabsContent>

                <TabsContent value="res" className="p-6 space-y-6">
                    <UserResManagement/>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default UserManagement;

