import React from "react";
import { SlHome } from "react-icons/sl";

const Menucontent = (props) => {
  return (
    <>
      <div className="w-full h-fit flex justify-start items-center text-[#777777]  gap-[10px] text-[14px] hover:text-white transition-all ease-in-out duration-200 cursor-pointer   ">
        <div className="text-[17px] ">{props.icon}</div>
        <div className="font-MainLight text-[15px] ">{props.title}</div>
      </div>
    </>
  );
};

export default Menucontent;
