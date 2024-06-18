// components/withAuth.tsx

import { useEffect, ComponentType } from "react";
import { isAuthenticated } from "@/lib/utils";
import { useLocalStorage } from "usehooks-ts";
import { usePathname, useRouter } from "@/navigation";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const path = usePathname();
    const router = useRouter();
    const [isAccessEdu] = useLocalStorage("isAccessEdu", false);
    const [isAccessChooseDir] = useLocalStorage("isAccessChooseDir", false);

    useEffect(() => {
      if (!isAuthenticated()) {
        router.replace("/auth"); // Redirect to login page if not authenticated
      }
      if (path === "/education-info") {
        if (!isAccessEdu) {
          router.replace("/personal-info");
        }
      }

      if (path === "/choose-direction") {
        if (!isAccessEdu) {
          router.replace("/personal-info");
        }

        if (!isAccessChooseDir) {
          router.replace("/education-info");
        }
      }
    }, []);

    return isAuthenticated() ? <WrappedComponent {...props} /> : null;
  };

  return AuthComponent;
};

export default withAuth;
