import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
const MenuItem = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const findCart = cart.products.find((item) => item._id === product._id);
  const dispatch = useDispatch();
  const handleCart = () => {
    dispatch(
      addProduct({
        ...product,
        extras: [{ text: "empty" }],
        price: product.prices[0],
        quantity: 1,
      })
    );
  };
  return (
    <div className="bg-secondary  w-full  rounded-3xl">
      <div
        className="w-full h-[13.4375rem] bg-[#f1f2f3] 
      p-[1.875rem] rounded-bl-[46px] rounded-tl-2xl
       rounded-tr-2xl grid place-content-center"
      >
        <Link className="cursor-pointer" href={`/product/${product._id}`}>
          <div className="relative w-40 h-40 hover:scale-125 transition-all duration-300">
            <Image
              src={`${product.img}`}
              layout="fill"
              alt="pizza"
              className="object-contain"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="text-white pt-[1.875rem] px-[1.875rem] ">
          <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
          <p className="text-sm leading-6">{product.desc}</p>
        </div>
        <div className="flex justify-between items-center px-[1.875rem] pb-5">
          <span className="text-white">${product.prices[0]}</span>
          <button
            disabled={findCart}
            onClick={() => handleCart()}
            className="btn-primary !w-10 !h-10 !rounded-full !p-0 grid place-content-center"
          >
            <RiShoppingCart2Fill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
