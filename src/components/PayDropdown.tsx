import { Button, Label, Spinner } from "flowbite-react";
import { useState, type Dispatch, type SetStateAction } from "react";
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

  const [open, setOpen] = useState<boolean>(false);

  const { mutate, isLoading } = api.creditCard.pay.useMutation({
    onSuccess: () => {
      setAmount(0);
      void ctx.creditCard.getAll.invalidate();
    },
  });

  return (
    <div className="relative inline-block">
      <Button
        disabled={disabled}
        className="ml-auto bg-blue-700 enabled:hover:bg-blue-800"
        onClick={() => setOpen(!open)}
      >
        <h2>Pay</h2>
        <FiChevronDown className="my-auto ml-1" />
      </Button>
      {open && (
        <li
          className={`${
            disabled ? "hidden" : ""
          } absolute right-0 top-[100%] z-50 mt-2 w-[200px] list-none rounded-lg bg-white p-4 shadow-md`}
        >
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
              {isLoading ? (
                <>
                  <Spinner />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </li>
      )}
    </div>
  );
};

export default PayDropdown;
