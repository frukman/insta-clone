import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useLogout = () => {
  const showToast = useShowToast();

  const logoutUser = useAuthStore((state) => state.logout);

  const [signout, isLogingOut, error] = useSignOut(auth);

  const handleLogout = async () => {
    try {
      await signout();
      localStorage.removeItem("user-instagram");
      logoutUser();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { handleLogout, isLogingOut, error };
};

export default useLogout;
