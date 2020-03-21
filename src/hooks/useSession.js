import { useContext } from "react";
import userContext from "../contexts/userContext";
export const useSession = () => {
  const { user, userProfile } = useContext(userContext);
  return [user, userProfile];
};
