import React, { forwardRef, useEffect, useRef, useState } from "react";
import ScrollTextAnimationHome from "./ScrollTextAnimationHome";
import { GoArrowUpRight } from "react-icons/go";
import axios from "axios";
import gsap from "gsap";

import { LuLoader } from "react-icons/lu";
const Contact = forwardRef((props, ref) => {
  const [data, setdata] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isLoading, setisLoading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState(false);
  const [responses, setresponses] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setisLoading(true);

      const response = await axios.post(
        "https://my-portfolio-r3ov.onrender.com/api/v1/sendmail",
        data
      );

      console.log(response.data);
      setresponses(response.data);
      if (response.status === 200) {
        setsuccess(true);
        setdata({ name: "", email: "", phone: "", message: "" });
      } else {
        setsuccess(false);
      }
    } catch (error) {
      seterror(true);
    } finally {
      setisLoading(false);
    }
  };

  const successRef = useRef(null);

  useEffect(() => {
    if (success && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }
  }, [success]);

  return (
    <div
      ref={ref}
      className="lg:w-[750px] lg:h-auto bg-[#1a1a1a84] lg:p-14 p-8  rounded-2xl inner-shadow backdrop-blur-[8px]  "
    >
      <div>
        <ScrollTextAnimationHome title={"Contact For Work"} stagger={0.09} />
      </div>

      <form className="mt-20" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-10">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-2xl font-MainLight text-[#ffffffc6]">
              Your Name
            </label>
            <input
              name="name"
              type="text"
              value={data.name}
              onChange={handleChange}
              required
              placeholder="Enter Your Name"
              className="peer text-[#BBBBBB] mt-3 h-10 outline-none bg-transparent"
            />
            <div className="w-full h-[1px] bg-[#bbbbbb3e] rounded-2xl transition-all duration-300 ease-in-out peer-focus:bg-white peer-focus:opacity-100 opacity-40" />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-2xl font-MainLight text-[#ffffffc6]">
              Your Email
            </label>
            <input
              required
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="peer text-[#BBBBBB] mt-3 h-10 outline-none bg-transparent"
            />
            <div className="w-full h-[1px] bg-[#bbbbbb3e] rounded-2xl transition-all duration-300 ease-in-out peer-focus:bg-white peer-focus:opacity-100 opacity-40" />
          </div>

          <div className="flex flex-col">
            <label className="text-2xl font-MainLight text-[#ffffffc6]">
              Your Phone Number{" "}
              <span className="text-[#BBBBBB] text-sm  ">(Optional)</span>
            </label>

            <input
              name="phone"
              type="tel"
              value={data.phone}
              onChange={handleChange}
              placeholder="Enter Your Phone Number"
              className="peer text-[#BBBBBB] mt-3 h-10 outline-none bg-transparent"
            />
            <div className="w-full h-[1px] bg-[#bbbbbb3e] rounded-2xl transition-all duration-300 ease-in-out peer-focus:bg-white peer-focus:opacity-100 opacity-40" />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label className="text-2xl font-MainLight text-[#ffffffc6]">
              Message
            </label>
            <textarea
              name="message"
              value={data.message}
              onChange={handleChange}
              placeholder="Enter your message"
              className="peer text-[#BBBBBB] mt-3 h-28 outline-none resize-none bg-transparent"
            />
            <div className="w-full h-[1px] bg-[#bbbbbb3e] rounded-2xl transition-all duration-300 ease-in-out peer-focus:bg-white peer-focus:opacity-100 opacity-40" />
          </div>

          {/* Submit Button */}
          {success ? (
            <>
              <div ref={successRef} className="text-start">
                <h1 className="text-white font-MainLight text-md">
                  Message sent successfully
                </h1>
              </div>
            </>
          ) : (
            <div className="lg:mt-24 mt-24 w-full ">
              <button
                disabled={isLoading}
                className="lg:w-[29%] w-[84%]  bg-white  text-black mb-10   border-[0.1px] border-[#3e3e3e] font-MainLight text-md  h-[56px] rounded-full bottom-9 lg:bottom-10 bottom-mac  md:bottom-6 absolute"
              >
                <div className="flex justify-between items-center px-[3px] lg:px-[3px] md:px-[3px]  ">
                  <h1 className="text-start px-4 text-lg  hover:text-[#F3500F] transition-all duration-300 ease-in-out cursor-pointer">
                    {isLoading ? "Please wait." : "Get started"}
                  </h1>
                  <div className="w-[48px] h-[48px] bg-black rounded-full flex justify-center items-center text-[#ffffffe6] text-2xl hover:text-[#F3500F] transition-all duration-300 ease-in-out cursor-pointer">
                    {isLoading ? (
                      <LuLoader className="animate-spin" />
                    ) : (
                      <GoArrowUpRight />
                    )}
                  </div>
                </div>
              </button>
              {error && (
                <h1 className=" text-center font-MainLight text-orange-500 text-md ">
                  {" "}
                  {responses?.message || "error in sending message"}{" "}
                </h1>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
});

export default Contact;
