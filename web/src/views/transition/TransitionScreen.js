"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const TransitionScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsVisible(true);
    };

    const handleRouteChangeComplete = () => {
      setTimeout(() => setIsVisible(false), 500); // Delay to ensure smooth transition
    };

    // Manually control the navigation to show transition
    const handleNavigation = (url) => {
      handleRouteChangeStart();
      startTransition(() => {
        router.push(url);
        handleRouteChangeComplete();
      });
    };

    // Overriding router.push to include transition effect
    router.push = (url) => {
      handleNavigation(url);
    };
  }, [router, startTransition]);

  return (
    <div
      className={`fixed inset-0 bg-blue-500 z-50 transition-opacity duration-500 ${
        isVisible || isPending ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-center h-full">
        <h1 className="text-white text-3xl animate-pulse">Loading...</h1>
      </div>
    </div>
  );
};

export default TransitionScreen;
