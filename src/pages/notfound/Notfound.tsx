import React from "react";

import "./notFound.css";

const NotFound = () => {
  return (
    <div className="center-container"> {/* Add this container */}
      <img
        src="https://media.istockphoto.com/id/1207750534/photo/404-error-internet-page-not-found-hand-with-magnifier-concept-picture.webp?b=1&s=170667a&w=0&k=20&c=7NG6vLfv8QzSkhVxJuIUpTUQnoUyoKH_vQbHTPS-DZ8="
        alt="notfound"
        className="center-image" // Add this className
      />
    </div>
  );
};

export default NotFound;