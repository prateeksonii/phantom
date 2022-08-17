import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import CreateContactDialog from "../components/CreateContactDialog";
import { trpc } from "../utils/trpc";

const AppPage: NextPage = () => {
  const { data: user, isLoading, isError } = trpc.useQuery(["user.me"]);
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return <div>Error loading user...</div>;
  }

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="h-screen flex flex-col">
        <nav className="bg-zinc-900 px-8 h-16 flex items-center shadow-lg">
          <div className="font-head-bold text-2xl">Phantom</div>
        </nav>
        <div className="flex-1 flex flex-col">
          <div className="grid grid-cols-[30%_70%] h-full">
            <div className="h-full">
              <div className="p-8">
                <h6 className="text-sm">Welcome,</h6>
                <div className="relative">
                  <h4 className="text-4xl font-head-bold">{user?.name}</h4>
                  <button
                    className="absolute top-0 right-0 bg-white rounded-full"
                    onClick={() => setIsOpen(true)}
                  >
                    <AiFillPlusCircle className="text-emerald-600 text-5xl" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <a className="w-full py-4 text-lg bg-zinc-700 px-8">My space</a>
              </div>
            </div>
            <div className="bg-zinc-900 h-full"></div>
          </div>
        </div>
      </div>
      <CreateContactDialog isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AppPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx });

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};
