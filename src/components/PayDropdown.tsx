import { Button, Dropdown, Label } from "flowbite-react";
import React, { type Dispatch, type SetStateAction } from "react";
import CurrencyInput from "react-currency-input-field";
import { api } from "~/utils/api";
import { FiChevronDown } from "react-icons/fi";

type Props = {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  id: number;
  disabled: boolean;
};

const PayDropdown = ({ amount, setAmount, id, disabled }: Props) => {
  const ctx = api.useContext();

  const { mutate } = api.creditCard.pay.useMutation({
    onSuccess: () => {
      setAmount(0);
      void ctx.creditCard.getAll.invalidate();
    },
  });

  return (
    <Dropdown
      label="Pay"
      dismissOnClick={false}
      disabled={disabled}
      size="sm"
      placement="bottom"
      renderTrigger={() => (
        <Button className=" bg-blue-700 enabled:hover:bg-blue-800">
          <h2>Pay</h2>
          <FiChevronDown className="my-auto ml-1" />
        </Button>
      )}
    >
      <Dropdown.Item className={`${disabled ? "hidden" : ""}`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate({ id, amount: Number(amount) });
          }}
        >
          <div>
            <div className="mb-2">
              <div className="mb-2 block">
                <Label htmlFor="amount" value="Payment Amount" />
              </div>
              <CurrencyInput
                id="amount"
                name="amount"
                placeholder="Please enter an amount"
                value={amount}
                decimalsLimit={2}
                onValueChange={(value, _) => setAmount(Number(value))}
                prefix="$"
                className="w-full rounded-lg border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-700 enabled:hover:bg-blue-800"
          >
            Submit
          </Button>
        </form>
      </Dropdown.Item>
    </Dropdown>
  );
};

export default PayDropdown;
