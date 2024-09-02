import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  const getUserProfile = async (userName) => {
    setIsLoading(true);
    setUser(null);
    
    try {
      const q = query(
        collection(firestore, "users"),
        where("userName", "==", userName)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty)
        return showToast("Error", "User Not Found", "error");
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      showToast("Error", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, user, getUserProfile, setUser };
};

export default useSearchUser;
