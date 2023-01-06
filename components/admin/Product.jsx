import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Title from "../ui/Title";

const Product = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const productList = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      setProducts(productList.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    if (confirm("Are you sure want to delete this product")) {
      try {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );
        if (res.status === 200) {
          toast.success(res.data.message);
          getProducts();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getProducts();
  }, [products]);
  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5 overflow-x-auto">
      <Title addClass="text-[40px]">Products</Title>
      <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
        <thead className="text-xs text-gray-400 uppercase bg-gray-700">
          <tr>
            <th scope="col" className="py-3 px-6">
              IMAGE
            </th>
            <th scope="col" className="py-3 px-6">
              ID
            </th>
            <th scope="col" className="py-3 px-6">
              TITLE
            </th>
            <th scope="col" className="py-3 px-6">
              PRICE
            </th>
            <th scope="col" className="py-3 px-6">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr
              key={product._id}
              className="transition-all bg-secondary border-gray-700 hover:bg-primary "
            >
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                <Image src="/images/f1.png" alt="" width={50} height={50} />
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                {product._id.slice(0, 6)}...
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                {product.title}
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                ${product.prices[0]}
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="btn-primary !bg-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
