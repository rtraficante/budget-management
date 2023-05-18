import { Button } from "flowbite-react";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import AddCreditCardForm from "~/components/AddCreditCardForm";
import CreditCardTable from "~/components/CreditCardTable";
import DeleteModal from "~/components/DeleteModal";

import { api } from "~/utils/api";

const CreditCards: NextPage = () => {
  const { data } = api.creditCard.getAll.useQuery();
  const [toggleForm, setToggleForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);

  const ctx = api.useContext();

  const { mutate, isLoading } = api.creditCard.delete.useMutation({
    onSuccess: () => {
      setShowModal(false);
      setDeleteId(0);
      void ctx.creditCard.getAll.invalidate();
    },
  });

  const handleDelete = () => {
    mutate({ id: deleteId });
  };

  return (
    <>
      <Head>
        <title>DimeWise - Credit Cards</title>
        <meta name="description" content="Manage your finaces with ease" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className="m-8 mx-auto mt-20 flex h-[80vh] w-full max-w-[1000px] flex-col gap-4">
        <DeleteModal
          setShowModal={setShowModal}
          handleDelete={handleDelete}
          showModal={showModal}
          isLoading={isLoading}
          message="Are you sure you want to delete this Credit Card?"
        />
        <div className="flex flex-col">
          <Button
            onClick={() => setToggleForm(!toggleForm)}
            color={toggleForm ? `failure` : undefined}
            className={"ml-auto"}
          >
            {toggleForm ? "X" : "Add Credit Card"}
          </Button>
          {toggleForm ? <AddCreditCardForm /> : null}
        </div>
        {data !== undefined ? (
          <CreditCardTable
            data={data}
            setShowModal={setShowModal}
            setDeleteId={setDeleteId}
          />
        ) : null}
      </main>
    </>
  );
};

export default CreditCards;
