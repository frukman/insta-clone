import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const useLogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    if (!inputs.email) {
      return showToast("Error", "Please fill the email field", "error");
    }
    if (!inputs.password) {
      return showToast("Error", "Please fill the password field", "error");
    }
    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-instagram", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
      }
      if (!userCred) {
        showToast("Error", error.message, "error");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { loading, error, login };
};

export default useLogin;
