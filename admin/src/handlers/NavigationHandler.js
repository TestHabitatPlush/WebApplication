import { useNavigate } from "react-router-dom";

const NavigationHandler = () => {
  const navigate = useNavigate();

  const customNavigation = (url) => {
    navigate(url);
  };
  return { customNavigation };
};

export default NavigationHandler;
