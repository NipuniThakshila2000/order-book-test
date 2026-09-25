import type React from "react";

export function isProtectedPath(pathname: string) {
  void pathname;
  return false;
}

export function AccessBoundary({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) {
  void pathname;
  return <>{children}</>;
}
