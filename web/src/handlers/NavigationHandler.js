"use client";
import { useRouter } from "next/navigation";

const NavigationHandler = () => {
  const router = useRouter();

  const navigateToDashboard = () => {
    router.push("/");
  };

  const navigateToCommunity = () => {
    router.push("/community");
  };

  const navigateToMyUnit = () => {
    router.push("/myunit");
  };

  const navigateToFind = () => {
    router.push("/find");
  };

  const navigateToMore = () => {
    router.push("/more");
  };

  const customNavigation = (route) => {
    router.push(route);
  };

  return {
    navigateToDashboard,
    navigateToCommunity,
    navigateToMyUnit,
    customNavigation,
    navigateToFind,
    navigateToMore,
  };
};

export default NavigationHandler;
