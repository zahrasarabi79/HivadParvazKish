"use client";
import { usePathname, useRouter } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();

  return <h1>Hello, Home page!</h1>;
}
