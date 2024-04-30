"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Product } from "@/types/product";

const Table = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://soal3-be.vercel.app/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (productId: number) => {
    try {
      await axios.delete(`https://soal3-be.vercel.app/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Products
        </h4>
        <Link href="/product/add">
          <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            Add Product
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Stock</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Manage</p>
        </div>
      </div>

      {products.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={product.image}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.category}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.stock}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex">
              <Link
                href={`/product/edit/${product.id}`}
                className="px-2 text-primary"
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M415.831 515.818H284.876c-10.33 0-18.706 8.377-18.706 18.71s8.375 18.706 18.706 18.706h130.956c10.332 0 18.708-8.374 18.708-18.706s-8.376-18.71-18.709-18.71z m-56.125 149.664h-74.831c-10.33 0-18.706 8.375-18.706 18.708 0 10.33 8.375 18.706 18.706 18.706h74.831c10.332 0 18.71-8.375 18.71-18.706 0-10.333-8.377-18.708-18.71-18.708z m187.08-280.616c0-10.332-8.377-18.71-18.708-18.71H284.876c-10.33 0-18.706 8.377-18.706 18.71s8.375 18.706 18.706 18.706h243.202c10.33 0 18.708-8.374 18.708-18.706z m37.415-261.91H434.539c-206.64 0-374.155 167.515-374.155 374.155v56.123c0 206.64 167.515 374.155 374.155 374.155h149.662c206.64 0 374.155-167.515 374.155-374.155V497.11c0-206.64-167.515-374.154-374.155-374.154zM880.039 303.5l28.726 103.557-282.189 282.187c-20.225 20.229-69.692 3.553-69.692 3.553s-16.674-49.469 3.551-69.694L880.039 303.5z m-323.9 586.473H462.6c-201.474 0-364.8-163.326-364.8-364.801 0-201.473 163.326-364.801 364.801-364.801h93.539c106.552 0 202.43 45.686 269.126 118.533L517.199 586.969c-40.182 40.182-7.829 153.342-7.829 153.342s113.159 32.353 153.342-7.829L917.83 477.364a368.212 368.212 0 0 1 3.111 47.808c-0.001 201.475-163.329 364.801-364.802 364.801z"
                    fill="#FF4545"
                  />
                </svg>
              </Link>
              <Link
                href="#"
                onClick={() => deleteProduct(product.id)}
                className="px-2 text-danger"
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M609.472 381.573c-10.314 0-18.676 8.364-18.676 18.679V717.77c0 10.316 8.362 18.679 18.676 18.679 10.316 0 18.679-8.364 18.679-18.679V400.253c0-10.316-8.364-18.68-18.679-18.68z m-224.129 0c-10.316 0-18.678 8.364-18.678 18.679V717.77c0 10.316 8.362 18.679 18.678 18.679s18.678-8.364 18.678-18.679V400.253c-0.001-10.316-8.363-18.68-18.678-18.68zM852.282 250.83H665.506v-18.678c0-92.839-75.261-168.098-168.098-168.098-92.839 0-168.098 75.26-168.098 168.098v18.678H142.534c-10.316 0-18.678 8.364-18.678 18.679 0 10.316 8.362 18.676 18.678 18.676h37.353v345.537c0 180.519 146.341 326.856 326.858 326.856 180.519 0 308.182-146.337 308.182-326.856V288.185h37.355c10.316 0 18.676-8.36 18.676-18.676 0-10.315-8.36-18.679-18.676-18.679z m-485.617-20.114c0-71.414 58.534-129.307 130.743-129.307 72.208 0 130.743 57.893 130.743 129.307v20.114H366.665v-20.114z m410.907 403.007c0 159.888-110.939 289.501-270.827 289.501S217.242 793.61 217.242 633.723l0.002-345.537h560.328v345.537z"
                    fill="#E21B1B"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
