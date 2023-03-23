import React from "react";

const Pokemon = ({ children }: { children: JSX.Element }) => {
  return (
    <div>
      <h2>Titulo</h2>
      {children}
    </div>
  );
};

export default Pokemon;
