import { useCallback } from "react";
import { useDispatch } from "react-redux";
import * as applicationModule from "@/redux/reducer/application";

export function useButtonAction(action) {
  const dispatch = useDispatch();

  return useCallback(() => {
    if (!action?.type) return;

    const handler = applicationModule[action.type];

    if (typeof handler === "function") {
      dispatch(handler(action.state));
    } else {
      console.warn(`${action.type} not found`);
    }
  }, [action, dispatch]);
}