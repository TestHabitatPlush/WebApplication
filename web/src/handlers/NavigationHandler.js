"use client";
import { useRouter } from "next/navigation";

const NavigationHandler = () => {
  const router = useRouter();
 // helper: navigate + refresh
  const navigate = (path) => {
    if (!path) return;

    router.push(path);
    router.refresh(); // ✅ refresh ONLY on click
  };

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

  const navigateToHelp = () => {
    router.push("/help");
<<<<<<< HEAD
=======
  };

  const customNavigation = (route) => {
    router.push(route);
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
  };

  // const customNavigation = (route) => {
  //   router.push(route);
  // };
const customNavigation = (route, refresh = false) => navigate(route, refresh);

  return {
    navigateToDashboard,
    navigateToCommunity,
    navigateToMyUnit,
    customNavigation,
    navigateToFind,
    navigateToMore,
    navigateToHelp
  };
};

export default NavigationHandler;
