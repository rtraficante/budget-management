import { Button, Pagination } from "flowbite-react";
import { type NextPage } from "next";
import Head from "next/head";
import { type ChangeEvent, useState } from "react";
import DeleteModal from "~/components/DeleteModal";
import TransactionForm from "~/components/TransactionForm";
import TransactionTable from "~/components/TransactionTable";
import { api } from "~/utils/api";

const PAGE_SIZE = 25;

const Transactions: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = api.transaction.getAll.useQuery({
    page: currentPage,
    size: PAGE_SIZE,
  });
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

  const handleNextPage = (page: number) => {
    if (!data?.count) return;

    const totalPages = data?.count / PAGE_SIZE;
    if (currentPage == totalPages) return;
    setCurrentPage(page);
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
            data={data.transactions}
            setShowModal={setShowModal}
            handleCheckbox={handleCheckbox}
            checkedIds={checkedIds}
          />
        ) : null}
        {data?.count && data.count > PAGE_SIZE && (
          <Pagination
            className="mx-auto"
            currentPage={currentPage}
            onPageChange={(page) => {
              handleNextPage(page);
            }}
            showIcons
            totalPages={Math.ceil(data.count / PAGE_SIZE)}
          />
        )}
      </main>
    </>
  );
};

export default Transactions;
