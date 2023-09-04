import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuth() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("myToken")) {
      router.push("/login");
    }
  }, []);
}
