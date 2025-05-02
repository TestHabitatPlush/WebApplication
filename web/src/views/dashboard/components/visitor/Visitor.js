import React from "react";
import AddVisitor from "./AddVisitor";
import VisitorList from "./VisitorList";

const Visitor = () => {
  return (
    <section>
      <VisitorList />
      <AddVisitor />
    </section>
  );
};

export default Visitor;
