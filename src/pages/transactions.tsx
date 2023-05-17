import { Button } from "flowbite-react";
import { type NextPage } from "next";
import Head from "next/head";
import { type ChangeEvent, useState } from "react";
import DeleteModal from "~/components/DeleteModal";
import TransactionForm from "~/components/TransactionForm";
import TransactionTable from "~/components/TransactionTable";
import { api } from "~/utils/api";

const Transactions: NextPage = () => {
  const { data } = api.transaction.getAll.useQuery();
  const [toggleForm, setToggleForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setCheckedIds((prev) => [...prev, Number(value)]);
    } else {
      setCheckedIds((prev) => prev.filter((id) => id !== Number(value)));
    }
  };

  const ctx = api.useContext();

  const { mutate, isLoading } = api.transaction.delete.useMutation({
    onSuccess: () => {
      setShowModal(false);
      void ctx.transaction.getAll.invalidate();
      setCheckedIds([]);
    },
  });

  const handleDelete = () => {
    mutate({ ids: checkedIds });
  };

  return (
    <>
      <Head>
        <title>DimeWise - Transactions</title>
        <meta name="description" content="Manage your finaces with ease" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className="m-8 mx-auto mt-20 flex w-full max-w-[1000px] flex-col gap-4">
        <DeleteModal
          setShowModal={setShowModal}
          handleDelete={handleDelete}
          showModal={showModal}
          isLoading={isLoading}
          message="Are you sure you want to delete this transaction(s)?"
        />
        <div className="flex flex-col">
          <Button
            onClick={() => setToggleForm(!toggleForm)}
            color={toggleForm ? `failure` : undefined}
            className={"ml-auto"}
          >
            {toggleForm ? "X" : "Add Transaction"}
          </Button>
          {toggleForm ? <TransactionForm /> : null}
        </div>
        {data !== undefined ? (
          <TransactionTable
            data={data}
            setShowModal={setShowModal}
            handleCheckbox={handleCheckbox}
            checkedIds={checkedIds}
          />
        ) : null}
      </main>
    </>
  );
};

export default Transactions;
