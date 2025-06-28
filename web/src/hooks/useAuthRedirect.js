import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const useAuthRedirect = (redirectTo = "") => {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);
};

export default useAuthRedirect;
