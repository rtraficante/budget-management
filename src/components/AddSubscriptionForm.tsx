import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { type ChangeEvent, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { api } from "~/utils/api";

type SubscriptionFormData = {
  chargeDate: number;
  company: string;
  plan: "MONTHLY" | "WEEKLY" | "YEARLY";
  recurringCharge: number;
};

const AddSubscriptionForm = () => {
  const [formData, setFormData] = useState<SubscriptionFormData>({
    chargeDate: 1,
    company: "",
    plan: "MONTHLY",
    recurringCharge: 0,
  });

  const ctx = api.useContext();

  const { mutate, error, isLoading } = api.subscription.add.useMutation({
    onSuccess: () => {
      setFormData({
        chargeDate: 1,
        company: "",
        plan: "MONTHLY",
        recurringCharge: 0,
      });
      void ctx.subscription.getAll.invalidate();
    },
  });

  const handleFormChange = (
    e: ChangeEvent<HTMLSelectElement> | React.FormEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  return (
    <form
      className=" flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        mutate({
          ...formData,
          chargeDate: Number(formData.chargeDate),
          recurringCharge: Number(formData.recurringCharge),
        });
      }}
    >
      <div className="flex flex-col gap-4">
        <div>
          <p>{error?.message}</p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="charge-date" value="Monthly Charge Date" />
            </div>
            <TextInput
              id="charge-date"
              name="chargeDate"
              type="number"
              min={1}
              max={31}
              value={formData.chargeDate}
              onChange={handleFormChange}
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="recurring-charge" value="Amount" />
            </div>
            <CurrencyInput
              id="recurring-charge"
              name="recurringCharge"
              placeholder="Please enter an amount"
              value={formData.recurringCharge}
              fixedDecimalLength={2}
              decimalsLimit={2}
              onValueChange={(value, name) =>
                setFormData({ ...formData, [name as string]: value })
              }
              prefix="$"
              className="w-full rounded-lg border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="company" value="Company" />
            </div>
            <TextInput
              id="company"
              name="company"
              type="text"
              placeholder="Netflix, Amazon, etc."
              value={formData.company}
              onChange={handleFormChange}
              required={true}
            />
          </div>
          <div className="my-auto">
            <label
              htmlFor="plans"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              id="plans"
              name="plan"
              value={formData.plan}
              onChange={handleFormChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
            </select>
          </div>
        </div>
      </div>

      <Button type="submit">
        {" "}
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
  );
};

export default AddSubscriptionForm;
