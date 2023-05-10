import { Button } from "flowbite-react";
import { type NextPage } from "next";
import { useState } from "react";
import TransactionForm from "~/components/TransactionForm";
import TransactionTable from "~/components/TransactionTable";
import { api } from "~/utils/api";

const Transactions: NextPage = () => {
  const { data } = api.transaction.getAll.useQuery();
  const [toggleForm, setToggleForm] = useState(false);

  return (
    <main className="m-8 mx-auto flex w-full max-w-[1000px] flex-col gap-4">
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
      {data !== undefined ? <TransactionTable data={data} /> : null}
    </main>
  );
};

export default Transactions;
