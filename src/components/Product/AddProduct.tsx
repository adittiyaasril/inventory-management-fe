"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import { Product } from "@/types/product";

const AddProduct = () => {
  const router = useRouter();

  const [product, setProduct] = useState<Product>({
    id: 0,
    image: "",
    name: "",
    category: "",
    price: 0,
    stock: 0,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`https://soal3-be.vercel.app/products`, product);
      router.push("/product");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Add Product</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label
              htmlFor="productName"
              className="mb-3 block text-sm font-medium text-black dark:text-white"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <SelectGroupOne handleCategoryChange={handleCategoryChange} />

          <div className="mb-4.5">
            <label
              htmlFor="productImage"
              className="mb-3 block text-sm font-medium text-black dark:text-white"
            >
              Image Url
            </label>
            <input
              type="text"
              id="productImage"
              name="image"
              value={product.image}
              onChange={handleInputChange}
              placeholder="Enter image URL"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
            <label
              htmlFor="productStock"
              className="mb-3 block text-sm font-medium text-black dark:text-white"
            >
              Stock
            </label>
            <input
              type="text"
              id="productStock"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              placeholder="Enter stock"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
            <label
              htmlFor="productPrice"
              className="mb-3 block text-sm font-medium text-black dark:text-white"
            >
              Price
            </label>
            <input
              type="text"
              id="productPrice"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
