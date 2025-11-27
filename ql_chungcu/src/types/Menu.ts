import {
    Building,
    Building2,
    FileText,
    Home,
    LogOut, type LucideIcon,
    Network,
    Settings, UserCog,
    UserRoundCog,
    Workflow,
} from "lucide-react";

export interface MenuItem {
    id: number;
    title: string;
    url: string;
    icon: LucideIcon;
    child: MenuItem[];
    permissions?: string[]; // Required permissions (ANY logic)
    requireAll?: boolean; // If true, use ALL logic instead of ANY
}

/**
 * Cấu hình menu items cho sidebar
 * permissions: Danh sách quyền cần có (OR logic mặc định)
 * requireAll: true = Cần tất cả quyền (AND logic)
 */
export const menuItems: MenuItem[] = [
    {
        id: 1,
        title: "Trang chủ",
        url: "/page/dashboard",
        icon: Home,
        child: [],
        // Không cần permissions = ai cũng vào được
    },
    {
        id: 2,
        title: "Quản lý cơ cấu tổ chức",
        url: "/page/org",
        icon: Network,
        child: [],
        permissions: ["view:organization"],
    },
    {
        id: 3,
        title: "Quản lý quy trình",
        url: "/page/bsn",
        icon: Workflow,
        child: [],
        permissions: ["view:workflow"],
    },
    {
        id: 8,
        title: "Quản lý tòa nhà",
        url: "/page/bd",
        icon: Building2,
        child: [],
        permissions: ["view:building"],
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
                child: [],
                permissions: ["view:resident"],
            },
            {
                id: 6,
                title: "Quản lý căn hộ",
                url: "/page/apres/apt",
                icon: Home,
                child: [],
                permissions: ["view:apartment"],
            },
        ],
        // Hiển thị menu cha nếu có ít nhất 1 quyền con
        permissions: ["view:apartment", "view:resident"],
    },
    {
        id: 10,
        title: "Xử lý yêu cầu",
        url: "/page/reply",
        icon: FileText,
        child: [],
        permissions: ["view:task"],
    },
    {
        id: 11,
        title: "Quản lý truy cập",
        url: "/page/authori",
        icon: UserCog,
        child: [],
        permissions: ["view:user", "view:role", "view:permission"],
        requireAll: false,
    },
    {
        id: 7,
        title: "Cài đặt",
        url: "#",
        icon: Settings,
        child: [],
        permissions: ["view:organization"],
    },
    {
        id: 9,
        title: "Đăng xuất",
        url: "#",
        icon: LogOut,
        child: [],
        // Không cần permissions = ai cũng thấy
    },
];
