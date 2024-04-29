"use client";
import {
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import { Product } from "@/types/product";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
  const router = useRouter();
  const { id } = useParams();

  const [product, setProduct] = useState<Product>({
    id: 0,
    image: "",
    name: "",
    category: "",
    price: 0,
    stock: 0,
  });

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://soal3-be.vercel.app/products/${id}`,
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id, fetchProduct]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`https://soal3-be.vercel.app/products/${id}`, product);
      toast.success("Product edited successfully", {
        onClose: () => {
          router.push("/product");
        },
      });
    } catch (error: any) {
      console.error(
        "Error editing product:",
        error.response?.data || error.message,
      );
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <ToastContainer autoClose={1000} transition={Bounce} />
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Edit Product</h3>
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
              required
              id="productName"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <SelectGroupOne handleCategoryChange={() => {}} />

          <div className="mb-4.5">
            <label
              htmlFor="productImage"
              className="mb-3 block text-sm font-medium text-black dark:text-white"
            >
              Image Url
            </label>
            <input
              type="text"
              required
              id="productImage"
              name="image"
              value={product.image}
              onChange={handleInputChange}
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
              required
              id="productStock"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
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
              required
              id="productPrice"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Edit Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
