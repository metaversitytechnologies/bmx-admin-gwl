import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../store/service/authService";

export const useAdminLogout = () => {
  const [trigger] = useLogoutMutation();
  const nav = useNavigate();

  return () => {
    trigger();
    localStorage.clear();
    nav("/");
  };
};
