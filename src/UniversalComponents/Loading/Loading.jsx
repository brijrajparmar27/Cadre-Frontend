import { LottiePlayer } from "lottie-react";
import React from "react";
import "./Loading.css";
import Lottie from "lottie-react";

export default function Loading({ isLoading, display }) {
  return (
    <>
      {isLoading && (
        <div className="loading_contain">
          <div className="lottie_contain">
            {<Lottie animationData={display} loop={true} />}
          </div>
        </div>
      )}
    </>
  );
}
