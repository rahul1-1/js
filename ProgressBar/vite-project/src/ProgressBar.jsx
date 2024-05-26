/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

const ProgressBar = ({ value = 0  ,onComplete = ()=>{}}) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(Math.min(100, Math.max(0, value)));
    if(percent>=100){
      onComplete()
    }
  }, [value]);

  return (
    <div className="progress">
      <span style={{color: percent >= 49 ? "white" : "black"}}> {percent.toFixed()}%</span>
      <div
        style={{width: `${percent}%`}}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent.toFixed}
      ></div>
    </div>
  );
};

export default ProgressBar;
