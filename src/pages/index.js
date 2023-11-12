import CheckoutButton from "@/components/checkout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next Stripe</title>
      </Head>
      <div className="flex h-screen justify-center items-center">
        <div>
          <CheckoutButton amount={2} />
        </div>
      </div>
    </>
  );
}
