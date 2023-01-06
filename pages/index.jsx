import Head from "next/head";
import api from "../api";
import Home from "./home";
export default function Index({ categoryList, productList }) {
  return (
    <div>
      <Head className="">
        <title>Feane</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home categoryList={categoryList} productList={productList} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const category = await api.get(`/categories`);
  const product = await api.get(`/products`);
  return {
    props: {
      categoryList: category.data ? category.data : [],
      productList: product.data ? product.data : [],
    },
  };
};