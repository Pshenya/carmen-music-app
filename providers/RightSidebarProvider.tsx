"use client";

import RightSidebar from "@/components/RightSidebar";
import SongsQueueList from "@/components/SongsQueueList";
import { useEffect, useState } from "react";

interface RightSidebarProviderProps {
}

const RightSidebarProvider: React.FC<RightSidebarProviderProps> = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SongsQueueList />
    </>
  )
}

export default RightSidebarProvider
