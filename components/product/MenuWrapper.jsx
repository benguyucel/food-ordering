import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";
import ClipLoader from "react-spinners/ClipLoader";

const MenuWrapper = ({ categoryList, productList }) => {
  const [active, setActive] = useState(0);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [productLimit, setProductLimit] = useState(3);
  useEffect(() => {
    setFilteredProduct(
      productList?.filter((product) =>
        categoryList?.length + 1 === active
          ? product.category
          : product.category === categoryList[active].title.toLowerCase()
      )
    );
  }, [productList, categoryList, active]);
  return (
    <div className="container mx-auto flex flex-col items-center mb-16">
      <Title addClass="text-[2.5rem]">Our Menu</Title>
      <div className="mt-[2.8125rem] mb-[2.25rem]">
        <button
          onClick={() => {
            setActive(categoryList?.length + 1);
            setProductLimit(3);
          }}
          className={`px-6 py-2  rounded-3xl ${
            categoryList?.length + 1 === active && "bg-secondary text-white"
          }`}
        >
          All
        </button>
        {categoryList &&
          categoryList.map((category, index) => (
            <button
              className={`px-6 py-2  rounded-3xl ${
                index === active && "bg-secondary text-white"
              }`}
              key={category._id}
              onClick={() => setActive(index)}
            >
              {category.title}
            </button>
          ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3  w-full gap-8 min-h[450px]">
        {filteredProduct?.length > 0 &&
          filteredProduct
            .map((product) => <MenuItem key={product._id} product={product} />)
            .slice(0, productLimit)}
      </div>
      <div className="mx-auto mt-8">
        <button
          onClick={() => {
            setTimeout(() => {
              setProductLimit((prev) => prev + 2);
            }, 500);
          }}
          className="btn-primary"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default MenuWrapper;
