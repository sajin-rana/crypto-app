import { useEffect, useState } from "react";
import { handleCalendarClick } from "../utils/utils";

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
      inputRef?.current?.focus();
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

export function useKey(key: string, action: any) {
  useEffect(
    function () {
      function callback(e: any) {
        if (!e.code) return;
        if (e.code.toLowerCase() === key.toLocaleLowerCase()) {
          action();
        }
      }
      window.addEventListener("keydown", callback);
      return () => window.removeEventListener("keydown", callback);
    },
    [key, action]
  );
}

export function useOpenCalendar(setterFunction: any, ref: any) {
  useEffect(
    function () {
      function callback(e: any) {
        if (e.key === "k" && e.metaKey) {
          setterFunction(true);
          handleCalendarClick(ref);
        }
      }
      window.addEventListener("keydown", callback);
      return () => window.removeEventListener("keydown", callback);
    },
    [setterFunction, ref]
  );
}

export function useDropDownUpDownKeypress(
  index: any,
  setIndex: any,
  dataLength: number,
  handleOnEnter: any
) {
  useEffect(
    function () {
      function dropDownUpDownKeypress(e: KeyboardEvent) {
        if (e.code === "ArrowDown") {
          const indexNumber =
            index === null || index === dataLength - 1 ? 0 : index + 1;
          setIndex(indexNumber);
        } else if (e.code === "ArrowUp") {
          const indexNumber =
            index === null || index === 0 ? dataLength - 1 : index - 1;
          setIndex(indexNumber);
        } else if (e.code === "Enter") {
          handleOnEnter();
        }
      }
      window.addEventListener("keydown", dropDownUpDownKeypress);
      return () =>
        window.removeEventListener("keydown", dropDownUpDownKeypress);
    },
    [index, setIndex, dataLength, handleOnEnter]
  );
}
