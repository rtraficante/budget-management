import { Button, Label, TextInput } from "flowbite-react";
import React, { type ChangeEvent, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { api } from "~/utils/api";

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().substring(0, 10),
    amount: 0,
    category: "",
    description: "",
  });

  const ctx = api.useContext();

  const { mutate } = api.transaction.add.useMutation({
    onSuccess: () => {
      setFormData({
        date: new Date().toISOString().substring(0, 10),
        amount: 0,
        category: "",
        description: "",
      });
      void ctx.transaction.getAll.invalidate();
    },
  });

  const handleFormChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleDateChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newDate = new Date(e.currentTarget.value)
      .toISOString()
      .substring(0, 10);

    setFormData({ ...formData, date: newDate });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  return (
    <form
      className=" flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        mutate({
          ...formData,
          amount: Number(formData.amount),
          date: new Date(formData.date),
        });
      }}
    >
      <div className="flex flex-col">
        <div>
          <h2 className="mb-2 font-bold text-red-700 md:text-center">
            Please do not add credit card bills here, handle that on the credit
            card page.
          </h2>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="date" value="Date" />
            </div>
            <TextInput
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleDateChange}
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="amount" value="Amount" />
            </div>
            <CurrencyInput
              id="amount"
              name="amount"
              placeholder="Please enter an amount"
              value={formData.amount}
              fixedDecimalLength={2}
              decimalsLimit={2}
              onValueChange={(value, name) =>
                setFormData({ ...formData, [name as string]: value })
              }
              prefix="$"
              className="w-full rounded-lg border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
            />
          </div>
          <div className="my-auto">
            <label
              htmlFor="categories"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              id="categories"
              name="category"
              value={formData.category}
              onChange={handleSelectChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option>Choose a category</option>
              <option value="Food">Food</option>
            </select>
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <TextInput
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            type="text"
            required={false}
          />
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default TransactionForm;
