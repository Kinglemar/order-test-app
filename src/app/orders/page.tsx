"use client";
import NextLink from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [orders, setorders] = useState<
    { orderId: string; totalAmount: number; orderDate: string }[]
  >([]);

  //Mock a test

  const workerRef = useRef<Worker | null>(null);
  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/orderEvents.ts", import.meta.url)
    );

    workerRef.current.onmessage = (event) => {
      if (event.data.type === "ORDERS-LIST") {
        setorders(event.data.payload);
      }

      if (event.data.type === "ERROR") {
        console.error(event.data.payload);
      }
    };

    workerRef.current.postMessage({ type: "START_POLLING" });
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
          <div key={order.orderId} className="border p-3 my-3 rounded-3xl">
            <p>Amount paid: {order?.totalAmount}</p>
            <p>Date Ordered: {order.orderDate}</p>
          </div>
        ))}
      </section>
    </section>
  );
}
