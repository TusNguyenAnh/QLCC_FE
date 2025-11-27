import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext.tsx";

interface PermissionGuardProps {
  children: React.ReactNode;
  permissions: string[];
  requireAll?: boolean; // true: cần tất cả permissions, false: chỉ cần 1 permission
  fallback?: React.ReactNode; // Component hiển thị khi không có quyền
}

/**
 * Component để ẩn/hiện UI elements dựa trên permissions
 * // Hiển thị button chỉ khi có quyền manage:user
 * <PermissionGuard permissions={["manage:user"]}>
 *   <Button>Thêm User</Button>
 * </PermissionGuard>
 */

//Component để ẩn/hiện UI elements dựa trên permissions
export function PermissionGuard({
  children,
  permissions,
  requireAll = false,
  fallback = null,
}: PermissionGuardProps) {
  const { hasAnyPermission, hasAllPermissions } = useContext(AuthContext);

  if (permissions.length === 0) return <>{children}</>;

  const hasAccess = requireAll
    ? hasAllPermissions(permissions)
    : hasAnyPermission(permissions);

  if (!hasAccess) return <>{fallback}</>;

  return <>{children}</>;
}
