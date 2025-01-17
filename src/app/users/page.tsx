"use client";
import NextLink from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState<
    { name: string; email: string; customerId: string }[]
  >([]);
  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    customerId: string;
  }>({
    name: "",
    email: "",
    customerId: "",
  });

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://order-backend-3l4l.onrender.com/v1/parcels/get-test-users?limit=20"
      );
      // console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async () => {
    try {
      console.log({ reqBody: newUser });
      const response = await axios.post(
        "https://order-backend-3l4l.onrender.com/v1/parcels/create-test-users",
        newUser
      );

      setUsers((prev) => [response.data, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
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

      <h1 className="text-7xl text-center">Users</h1>
      <section className="mt-24 mx-auto max-w-4xl">
        <form
          className="p-5 max-w-sm bg-slate-300 flex flex-col gap-3"
          method="post"
        >
          <label htmlFor="name">name</label>
          <input
            onChange={(e) =>
              setNewUser((el) => {
                return { ...el, name: e.target.value };
              })
            }
            id="name"
            name="name"
            type="text"
          />
          <label htmlFor="email">email</label>
          <input
            onChange={(e) =>
              setNewUser((el) => {
                return { ...el, email: e.target.value };
              })
            }
            id="email"
            name="email"
            type="email"
          />
          <button
            onClick={createUser}
            type="button"
            className="bg-black text-white py-3 px-1"
          >
            Submit
          </button>
        </form>
        <h1>Data</h1>
        {users?.map((user) => (
          <div key={user.email} className="border p-3 my-3 rounded-3xl">
            <p className="text-end">User ID: {user?.customerId}</p>
            <p>name: {user?.name}</p>
            <p>email: {user.email}</p>
          </div>
        ))}
      </section>
    </section>
  );
}
