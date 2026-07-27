"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth.store";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const storeLogout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const logout = () => {
    // Purely client-side for now. Your backend has no POST /auth/logout
    // route and no server-side refresh-token revocation (AuthRepository
    // is user-CRUD only), so there's nothing to invalidate server-side —
    // clearing local state is functionally complete.
    //
    // BUT: if logout should appear in audit_logs (worth considering,
    // given the UserRole docstring's emphasis on every gokijany_admin
    // action being individually attributed and audited), that requires
    // a real backend endpoint, which doesn't exist yet. This is where
    // that call would go once it does — not a substitute for it.
    storeLogout();
    router.push("/login");
  };

  return { user, accessToken, isAuthenticated, logout };
}