"use client";
import NextLink from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [orders, setorders] = useState<
    { OrderID: string; TotalAmount: number; OrderDate: string }[]
  >([]);

  const getorders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:44000/v1/parcels/get-test-orders?limit=20"
      );
      setorders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getorders();
  }, []);
  return (
    <section>
      <nav>
        <ul className="flex gap-3 items-center justify-center">
          <li>
            <NextLink href={"/users"}>Users</NextLink>
          </li>
          <li>
            <NextLink href={"/orders"}>Orders</NextLink>
          </li>
        </ul>
      </nav>

      <h1 className="text-7xl text-center">Orders</h1>
      <section className="mt-24 mx-auto max-w-4xl">
        <h1>Data</h1>
        {orders?.map((order) => (
          <div key={order.OrderID} className="border p-3 my-3 rounded-3xl">
            <p>Amount paid: {order?.TotalAmount}</p>
            <p>Date Ordered: {order.OrderDate}</p>
          </div>
        ))}
      </section>
    </section>
  );
}
