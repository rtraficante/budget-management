import { type Dispatch, type ChangeEvent, type SetStateAction } from "react";
import DataTable from "./DataTable";
import { type FormattedSubscription } from "~/types";

interface Props {
  data: FormattedSubscription[];
  checkedIds: number[];
  handleCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const SubscriptionTable = ({
  data,
  checkedIds,
  handleCheckbox,
  setShowModal,
}: Props) => {
  return (
    <>
      <DataTable
        data={data}
        handleCheckbox={handleCheckbox}
        setShowModal={setShowModal}
        checkedIds={checkedIds}
        headers={{
          company: "Company",
          plan: "Billing Plan",
          recurringCharge: "Recurring Charge",
          chargeDate: "Next Charge Date",
        }}
      />
    </>
  );
};

export default SubscriptionTable;
