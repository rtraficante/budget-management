import { Button } from "flowbite-react";
import { type NextPage } from "next";
import { useState } from "react";
import AddSubscriptionForm from "~/components/AddSubscriptionForm";
import SubscriptionTable from "~/components/SubscriptionTable";
import { api } from "~/utils/api";

const Subscriptions: NextPage = () => {
  const [toggleForm, setToggleForm] = useState(false);

  const { data } = api.subscription.getAll.useQuery();
  console.log(data);

  return (
    <main className="m-8 mx-auto mt-20 flex w-full max-w-[1000px] flex-col gap-4">
      <div className="flex flex-col">
        <Button
          onClick={() => setToggleForm(!toggleForm)}
          color={toggleForm ? `failure` : undefined}
          className={"ml-auto"}
        >
          {toggleForm ? "X" : "Add Subscription"}
        </Button>
        {toggleForm ? <AddSubscriptionForm /> : null}
      </div>
      {data !== undefined ? <SubscriptionTable data={data} /> : null}
    </main>
  );
};

export default Subscriptions;
