import { Button } from "flowbite-react";
import { type NextPage } from "next";
import TransactionTable from "~/components/TransactionTable";
import { api } from "~/utils/api";

const Transactions: NextPage = () => {
  const { data } = api.transaction.getAll.useQuery();

  return (
    <main className="m-8 flex w-full flex-col gap-4">
      <div className="flex">
        <Button className="ml-auto">Add Transaction</Button>
      </div>
      {data !== undefined ? <TransactionTable data={data} /> : null}
    </main>
  );
};

export default Transactions;
