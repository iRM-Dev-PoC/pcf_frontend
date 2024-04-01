import { useContext } from "react";
import { CurrentURLType } from "../utils/types";
import { CurrentURLContext } from "../context/currentURLContext";

export const useCurrentURL = (): CurrentURLType => {
  const url = useContext(CurrentURLContext);
  if (url === null) {
    throw new Error("usePath must be used within a PathProvider");
  }
  const orginUrl = new URL(url);
  const origin = orginUrl.origin;
  return origin;
};
