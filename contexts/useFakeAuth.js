import { useContext } from "react";
import { FakeContext } from "./FakeAuthContext";

export function useFakeAuth() {
  const context = useContext(FakeContext);
  if (!context) {
    throw new Error("useFakeAuth must be used within a FakeAuthProvider");
  }
  return context;
}
