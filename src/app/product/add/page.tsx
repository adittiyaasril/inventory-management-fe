import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddProduct from "@/components/Product/AddProduct";

export const metadata: Metadata = {
  title: "Product Add",
  description:
    "Inventory Management for save your time form sorting your inventory manualy",
};

const FormLayout = () => {
  return (
    <DefaultLayout>
      <div className="w-full">
        <div className="flex flex-col gap-9">
          <AddProduct />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
