import NextLink from "next/link";

export default function Home() {
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
      <hr />
      <section className="mt-24 mx-auto max-w-4xl">
        Welcome to the Order App!
      </section>
    </section>
  );
}
