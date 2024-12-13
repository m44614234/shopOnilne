import React from "react";

const Meta = (props : any) => {
  return (
    <div>
      <meta charSet="utf-8" />
      <title>{props.title}</title>
    </div>
  );
};

export default Meta;
