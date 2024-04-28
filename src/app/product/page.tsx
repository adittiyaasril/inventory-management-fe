import Table from "@/components/Tables/Table";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Product Page",
  description:
    "Inventory Management for save your time form sorting your inventory manualy",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <Table />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
