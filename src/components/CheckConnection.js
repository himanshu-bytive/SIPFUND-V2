import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useInternetStatus = () => {
  const [isInternetReachable, setIsInternetReachable] = useState();
  const InternetChecker = () => {
    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        setIsInternetReachable(state.isInternetReachable);
        console.log("Connection type", state.type);
        console.log("Is internet Reachable?", isInternetReachable);
      });
      return () => {
        unsubscribe();
      };
    }, [isInternetReachable]);
  };

  return [InternetChecker, isInternetReachable];
};
