import Image from "next/image";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "./Title";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { useRouter } from "next/router";
import { PacmanLoader } from "react-spinners";

function Search({ setIsSearchModal }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const router = useRouter();
  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      setProducts(res.data);
      setFiltered(res.data.slice(0, 5));
    } catch (error) {}
  };
  useEffect(() => {
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, []);
  const handleSearch = (e) => {
    const searchFilter = products
      .filter((product) =>
        product.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
      .slice(0, 5);
    setFiltered(searchFilter);
  };
  return (
    <div
      className="fixed w-screen h-screen top-0 left-0
     bg-white bg-opacity-70 place-content-center grid transition-all z-50 "
    >
      <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
        <div className="relative md:w-[600px]  w-[370px]  border-2 p-10 bg-white rounded-2xl">
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsSearchModal(false)}
          >
            <GiCancel size={20} className="transition-all" />
          </button>
          <Title addClass="text-[2.5rem] text-center">Search</Title>
          <input
            className="h-12 w-full outline-none border border-primary px-4 pt-2 pb-2"
            placeholder="Search..."
            onChange={handleSearch}
          />
          {/* Food Search List Start */}
          {products.length > 0 ? (
            <ul>
              {filtered.map((product) => (
                <li
                  onClick={() => {
                    router.push(`/product/${product?._id}`);
                    setIsSearchModal(false);
                  }}
                  key={product._id}
                  className="flex items-center justify-between p-1 hover:bg-primary transition-all"
                >
                  <div className="flex">
                    <Image src={product.img} alt="" width={48} height={48} />
                  </div>
                  <span className="font-bold">{product.title}</span>
                  <span className="font-bold">${product.prices[0]}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center mt-3">
              <PacmanLoader color="#fca311" />
            </div>
          )}

          {/* Food Search List End */}
        </div>
      </OutsideClickHandler>
    </div>
  );
}

export default Search;
