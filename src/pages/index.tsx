import type { GetServerSideProps, NextPage } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({
    ctx,
  });

  if (session) {
    return {
      redirect: {
        destination: "/app",
        permanent: true,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};