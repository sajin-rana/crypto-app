import React from "react";

const BigArrow = ({ isUpArrow }: { isUpArrow: boolean }) => {
  return (
    <div className={`${isUpArrow ? "" : "rotate-180"}`}>
      {" "}
      <svg
        width="16"
        height="12"
        viewBox="0 0 16 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.16795 1.24807C7.56377 0.654342 8.43623 0.654342 8.83205 1.24808L14.9635 10.4453C15.4066 11.1099 14.9302 12 14.1315 12H1.86852C1.06982 12 0.59343 11.1099 1.03647 10.4453L7.16795 1.24807Z"
          fill={`${isUpArrow ? "#01F1E3" : "#FE2264"}`}
        />
      </svg>
    </div>
  );
};

export default BigArrow;
