import { useContext, useEffect, useState } from "react";
import { getLocalstorageData } from "../../localstorage/localstorage";
import Cart from "./Cart";
import { Context } from "../../context/AuthProvider";
import useCartData from "../../hooks/useCartData/useCartData";

const Carts = () => {
  const { newUser } = useContext(Context);
  const [openCouponInput, setOpenCouponInput] = useState(false);
  const [isTokenUsed, setIsTokenUsed] = useState(true);
  const [totalPriceDB, setTotalPriceDB] = useState(0);
  const [discountPriceDB, setDiscountPriceDB] = useState(0);
  const [totalPriceLocal, setTotalPriceLocal] = useState(0);
  const [copoun, setCopoun] = useState();
  const cartDB = useCartData();
  const cartLocal = getLocalstorageData();
  const email = newUser?.email;

  useEffect(() => {
    setTotalPriceDB(cartDB.reduce((sum, item) => sum + item.price, 0));
    // console.log(totalPriceDB)
  }, [cartDB]);

  useEffect(() => {
    setTotalPriceLocal(cartLocal.reduce((sum, item) => sum + item.price, 0));
  }, [openCouponInput]);

  const handleCoupon = () => {
    setOpenCouponInput(true);
  };
  const handleCheckCopoun = () => {
    if (copoun === "JASSHOP2024") {
      if (email) {
        setDiscountPriceDB(totalPriceDB * 0.7);
      } else {
        setTotalPriceLocal(totalPriceLocal * 0.7);
      }

      setIsTokenUsed(false);
    }
  };

  return (
    <div className="min-h-[80vh] py-yPadding w-4/5 lg:w-3/5 mx-auto">
      <div className="w-full flex flex-col-reverse lg:flex-row items-center lg:items-start justify-center gap-10">
        <div className="w-full">
          {email
            ? cartDB?.map((data) => <Cart key={data._id} data={data} />)
            : cartLocal?.map((data, id) => <Cart key={id} data={data} />)}
        </div>
        <div className="w-4/5 md:w-[400px] ">
          <div className="w-full border-2 border-black rounded-lg py-8 px-4">
            {!openCouponInput && (
              <button onClick={handleCoupon} className="btn">
                Use Coupon
              </button>
            )}
            {openCouponInput && isTokenUsed && (
              <div className="flex gap-3">
                <input
                  className="w-24 "
                  onChange={(e) => setCopoun(e.target.value)}
                  type="text"
                />
                <button
                  className="text-xl btn btn-sm"
                  onClick={handleCheckCopoun}
                >
                  use
                </button>
              </div>
            )}
            <p className="text-xl my-3">
              Total Item:{" "}
              <span className="font-bold">
                {email ? cartDB.length : cartLocal.length}
              </span>
            </p>
            <p className="text-xl">
              Total Price:{" "}
              <span className="font-bold">
                ${" "}
                {email
                  ? discountPriceDB
                    ? discountPriceDB.toFixed(2)
                    : totalPriceDB.toFixed(2)
                  : totalPriceLocal.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;
