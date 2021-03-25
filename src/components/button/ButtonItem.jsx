import * as React from "react";

function ButtonItem({ children }) {
  return (
    <>
      <li className="h-full w-full">
        {children}
      </li>
    </>
  );
}

export default ButtonItem;
