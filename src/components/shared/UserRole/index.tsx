import { RoleEnum } from "@/lib/models/account.model";

export default function UserRole({ role }: { role?: RoleEnum | string }) {
  return role === RoleEnum.ADMIN
    ? "Quản trị"
    : role === RoleEnum.MANAGER
    ? "Thủ thư"
    : "Bạn đọc";
}
