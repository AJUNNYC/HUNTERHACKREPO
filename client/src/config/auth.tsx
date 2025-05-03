import { auth, googleProvider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "../config/AuthUser";

export const AuthView = () => {
  const { userData } = useAuth();
  
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signOut_ = async () => {
    try {
      await signOut(auth);
      console.log("User Signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const loginBtns = () => {
    return userData ? (
      <button 
        onClick={signOut_}
        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        Logout
      </button>
    ) : (
      <button 
        onClick={signInWithGoogle}
        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        Sign in with Google
      </button>
    );
  };

  const userImage = () => {
    return userData?.image ? (
      <img 
        src={userData.image} 
        alt="User profile" 
        className="h-10 w-10 rounded-full object-cover"
      />
    ) : null;
  };

  return (
    <div className="flex items-center gap-2">
      {userImage()}
      {loginBtns()}
    </div>
  );
};