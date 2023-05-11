import { Button } from "flowbite-react";
import React from "react";

const creditcards = () => {
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
    </main>
  );
};

export default creditcards;
