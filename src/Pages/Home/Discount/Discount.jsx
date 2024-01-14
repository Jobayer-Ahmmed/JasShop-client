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
      className="flex justify-evenly items-center text-red-600 bg-red-500 w-[90%] lg:w-3/5 mx-auto my-myMargin h-40 rounded-ss-full"
    >
      <div className="bg-white w-48 h-32 rounded-full flex justify-center items-center discount-number">
        <p className="text-4xl font-amita font-bold">30% off</p>
      </div>
      <div>
        <p className="text-4xl font-amita font-bold text-white ml-20">
          With the coupon
        </p>
<div className="flex gap-5 ml-20 mt-5">
<p className="text-white text-2xl">{textToCopy}</p>
        <button className="text-2xl text-red-900" onClick={handleCopyClick}>{copied ? "Copied!" : <MdContentCopy />}</button>
</div>
      </div>
    </div>
  );
};

export default Discount;
