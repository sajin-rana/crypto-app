import { useEffect } from "react";

export function useHandleClickOutside(ref: any, setterFunction: any) {
  useEffect(
    function () {
      function handleClickOutside(e: any) {
        if (!ref.current?.contains(e.target)) {
          setterFunction(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
    },
    [ref, setterFunction]
  );
}
