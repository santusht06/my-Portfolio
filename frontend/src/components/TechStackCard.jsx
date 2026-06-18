import React from "react";

const TechStackCard = (props) => {
  return (
    <>
      <div className="lg:w-[490px]  lg:h-full bg-[#1111116a] inner-shadow  rounded-2xl backdrop-blur-[8px] ">
        <div className="lg:w-full p-10 lg:p-0  flex justify-center items-center h-full   ">
          <div className="w-full flex flex-col justify-center items-center gap-6  ">
            <div>
              <h3 className="lg:text-4xl text-2xl  text-white font-MainLight tracking-tight  ">
                {props.title}
              </h3>
            </div>
            <div className="h-24 w-24 overflow-hidden    ">
              <img src={props.image} alt={`${props.title} icon`} />
            </div>
            <div>
              <p className="text-xs text-[#b1b1b1] font-MainLight tracking-tight   ">
                {props.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TechStackCard;
