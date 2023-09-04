"use client";
import useAuth from "../../Utils/Hooks/authentication";

export default function Page() {
  useAuth();

  return <h1>Hello, Dashboard page!</h1>;
}
