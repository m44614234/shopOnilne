import React from "react";

const Container = (props : any) => {
  return (
    <section className={props.class1}>
      <div className="container">{props.children}</div>
    </section>
  );
};

export default Container;
