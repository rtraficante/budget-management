import { Button } from "flowbite-react";
import { type NextPage } from "next";
import { type ChangeEvent, useState } from "react";
import AddSubscriptionForm from "~/components/AddSubscriptionForm";
import DeleteModal from "~/components/DeleteModal";
import SubscriptionTable from "~/components/SubscriptionTable";
import { api } from "~/utils/api";

const Subscriptions: NextPage = () => {
  const { data } = api.subscription.getAll.useQuery();
  const [toggleForm, setToggleForm] = useState(false);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setCheckedIds((prev) => [...prev, Number(value)]);
    } else {
      setCheckedIds((prev) => prev.filter((id) => id !== Number(value)));
    }
  };

  const ctx = api.useContext();

  const { mutate, isLoading } = api.subscription.delete.useMutation({
    onSuccess: () => {
      setShowModal(false);
      void ctx.subscription.getAll.invalidate();
      setCheckedIds([]);
    },
  });

  const handleDelete = () => {
    mutate({ ids: checkedIds });
  };

  return (
    <main className="m-8 mx-auto mt-20 flex w-full max-w-[1000px] flex-col gap-4">
      <DeleteModal
        isLoading={isLoading}
        setShowModal={setShowModal}
        handleDelete={handleDelete}
        showModal={showModal}
        message="Are you sure you want to delete this subscription(s)?"
      />
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
      {data !== undefined ? (
        <SubscriptionTable
          data={data}
          setShowModal={setShowModal}
          handleCheckbox={handleCheckbox}
          checkedIds={checkedIds}
        />
      ) : null}
    </main>
  );
};

export default Subscriptions;
