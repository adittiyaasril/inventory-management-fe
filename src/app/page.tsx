import Dashboard from "@/components/Dashboard/Dashboard";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Inventory Management ",
  description:
    "Inventory Management for save your time form sorting your inventory manualy",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </>
  );
}
