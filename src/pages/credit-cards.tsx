import { Button } from "flowbite-react";
import { type NextPage } from "next";
import CreditCardTable from "~/components/CreditCardTable";

import { api } from "~/utils/api";

const CreditCards: NextPage = () => {
  const { data } = api.creditCard.getAll.useQuery();
  return (
    <main className="m-8 mx-auto mt-20 flex w-full max-w-[1000px] flex-col gap-4">
      <div className="flex flex-col">
        <Button
          // onClick={() => setToggleForm(!toggleForm)}
          // color={toggleForm ? `failure` : undefined}
          className={"ml-auto"}
        >
          Add Credit Card
        </Button>
        {/* {toggleForm ? <TransactionForm /> : null} */}
      </div>
      {data !== undefined ? <CreditCardTable data={data} /> : null}
    </main>
  );
};

export default CreditCards;
