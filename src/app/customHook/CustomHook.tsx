import { useEffect, useState } from "react";

export function useHandleClickOutside(ref: any, setterFunction: any) {
  useEffect(
    function () {
      function handleClickOutside(e: any) {
        if (!ref.current?.contains(e.target)) {
          setterFunction(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },
    [ref, setterFunction]
  );
}

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowWidth;
};

export function useInputFocus(inputRef: any) {
  useEffect(
    function () {
      inputRef.current.focus();
    },
    [inputRef]
  );
}

export function useCloseOnEscapePressed(setterFunction: any) {
  useEffect(
    function () {
      function closeOnEscapePressed(e: KeyboardEvent) {
        if (e.key === "Escape") {
          setterFunction(false);
        }
      }
      window.addEventListener("keydown", closeOnEscapePressed);
      return () => window.removeEventListener("keydown", closeOnEscapePressed);
    },
    [setterFunction]
  );
}
