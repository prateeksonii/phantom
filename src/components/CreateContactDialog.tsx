import { Dialog, Listbox } from "@headlessui/react";
import { User } from "@prisma/client";
import { FC, Fragment, useEffect, useState } from "react";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import AsyncSelect from "react-select/async";
import { trpc } from "../utils/trpc";

type CreateContactDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateContactDialog: FC<CreateContactDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchString, setSearchString] = useState("");
  const [searchValue] = useDebounce(searchString, 500);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState("");

  const { data: users, isLoading } = trpc.useQuery(
    [
      "user.search",
      {
        email: searchValue,
      },
    ],
    {
      enabled: !!searchValue,
      staleTime: Infinity,
      refetchOnMount: false,
    }
  );

  console.log(selectedUser);

  const handleLoadOptions = (inputValue: string, callback: any) => {
    if (!inputValue) {
      callback([]);
    } else {
      if (isLoading) {
        return callback([]);
      }

      setSearchString(inputValue);

      const options =
        users?.map((user) => ({ label: user.email, value: user })) || [];

      callback(options);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-800 border rounded-lg p-8 shadow-lg border-zinc-100 z-10"
    >
      <Dialog.Panel>
        <Dialog.Title className="text-3xl font-head-bold">
          Send a request
        </Dialog.Title>

        <Dialog.Description className="text-sm text-zinc-300">
          Send a request to the contact with a message. If they accept,
          they&apos;ll be added to your contacts.
        </Dialog.Description>

        <div className="mt-8 relative">
          <AsyncSelect
            loadOptions={handleLoadOptions}
            className="text-black"
            onChange={(user) => {
              setSelectedUser((user as { label: string; value: User }).value);
              setNickname(
                (user as { label: string; value: User }).value?.name ?? ""
              );
            }}
          />

          {selectedUser && (
            <div className="mt-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="nickname">Nickname</label>
                <input
                  type="text"
                  placeholder="Nickname"
                  className="bg-zinc-900"
                  onChange={(e) => setNickname(e.target.value)}
                  value={nickname}
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-600 py-2 px-4 rounded mt-4"
              >
                Invite
              </button>
              <button className="ml-4 bg-zinc-600 py-2 px-4 rounded mt-4">
                Cancel
              </button>
            </div>
          )}
          {/* <Listbox value={selectedUser} onChange={setSelectedUser}>
            <Listbox.Button>
              <>
                <input
                  placeholder="Type email to search"
                  className="w-full p-2 bg-zinc-900 placeholder:text-zinc-500"
                  onChange={(e) => setSearchString(e.target.value)}
                />
                <button>{selectedUser?.name ?? "Start typing email"}</button>
              </>
            </Listbox.Button>
            <Listbox.Options>
              {users?.map((user) => (
                <Listbox.Option key={user.id} value={user}>
                  {user.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox> */}
          {/* <div className="absolute z-20 left-0 right-0 mt-4 bg-zinc-700 rounded-md shadow max-h-[400px] overflow-auto">
            <div className="text-sm p-4 border-b border-zinc-500">
              Search results:
            </div>
            {users?.map((user) => (
              <div
                key={user.id}
                className="p-4 cursor-pointer transition-all hover:bg-emerald-600"
              >
                {user.name} | {user.email}
              </div>
            ))}
          </div> */}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default CreateContactDialog;
