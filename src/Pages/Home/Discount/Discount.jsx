import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from "react";
import {MdContentCopy} from "react-icons/md"

const Discount = () => {
  const [copied, setCopied] = useState(false);
  const textToCopy = "JASSHOP2024";

  const handleCopyClick = () => {
    // Create a temporary textarea element to hold the text
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select and copy the text
    textarea.select();
    document.execCommand("copy");

    // Remove the temporary textarea
    document.body.removeChild(textarea);

    // Update state to indicate that the text has been copied
    setCopied(true);

    // Reset the copied state after a short delay
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div
      data-aos="fade-down"
      className="md:pr-10 lg:px-4 py-3 flex justify-center  md:justify-evenly gap-7 items-center text-red-600 bg-red-500 w-[90%] lg:w-3/5 h-24 md:h-32 lg:h-40 mx-auto my-myMargin  rounded-ss-full"
    >
      <div className="bg-white md:-ml-12 lg:ml-0 w-24 md:w-48 h-16 md:h-24 lg:h-32 rounded-full flex justify-center items-center discount-number">
        <p className="text-xl md:text-4xl font-amita font-bold">30% off</p>
      </div>
      <div className="w-40">
        <p className="md:w-72 text-xl md:text-4xl font-amita font-bold text-white">
          With the coupon
        </p>
<div className="flex gap-5 md:mt-5"> 
<p className="text-white text-lg md:text-2xl">{textToCopy}</p>
        <button className="text-2xl text-red-900" onClick={handleCopyClick}>{copied ? "Copied!" : <MdContentCopy />}</button>
</div>
      </div>
    </div>
  );
};

export default Discount;
