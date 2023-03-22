import React from "react";
import Lottie from "lottie-react";
import "./Empty.css";

export default function Empty({ isLoading, isEmpty, display }) {
  return (
    <>
      {!isLoading && isEmpty && (
        <div className="empty_contain">
          <div className="lottie_contain">
            {<Lottie animationData={display} loop={true} />}
          </div>
        </div>
      )}
    </>
  );
}
