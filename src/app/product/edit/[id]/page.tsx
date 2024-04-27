import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EditProduct from "@/components/Product/EditProduct";

export const metadata: Metadata = {
  title: "Product Edit",
  description:
    "Inventory Management for save your time form sorting your inventory manualy",
};

const FormLayout = () => {
  return (
    <DefaultLayout>
      <div className="w-full">
        <div className="flex flex-col gap-9">
          <EditProduct />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
