import React from "react";
import RollingDigit from "./DigitRoll";

const Odometer = ({ value, length = 3 }) => {
  const padded = String(value).padStart(length, "0").split("");

  return (
    <div className="flex space-x-1">
      {padded.map((digit, index) => (
        <RollingDigit key={index} digit={parseInt(digit)} />
      ))}
    </div>
  );
};

export default Odometer;
