// components/withAuth.tsx

import { useEffect, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/utils";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated()) {
        router.replace("/auth"); // Redirect to login page if not authenticated
      }
    }, []);

    return isAuthenticated() ? <WrappedComponent {...props} /> : null;
  };

  return AuthComponent;
};

export default withAuth;
