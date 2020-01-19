import React from "react";
import { Helmet } from "react-helmet";

function Error() {
  return (
    <div className="Error">
      <Helmet>
        <title>Error</title>
      </Helmet>
      <h1>Error 404!</h1>
      <p>Sorry this page cannot be found</p>
    </div>
  );
}

export default Error;
