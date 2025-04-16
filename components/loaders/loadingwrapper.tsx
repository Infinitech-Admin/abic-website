"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/loaders";

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loader /> : <>{children}</>;
}
