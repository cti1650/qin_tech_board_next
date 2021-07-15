import * as React from "react";

function ListTitle(props) {
  return (
    <>
      <div className="dark:text-white text-black mt-4 text-lg">{props.title}</div>
    </>
  );
}

export default ListTitle;