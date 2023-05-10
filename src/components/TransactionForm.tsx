import { Button, Label, TextInput } from "flowbite-react";
import React, { type ChangeEvent, useState } from "react";
import CurrencyInput from "react-currency-input-field";

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().substring(0, 10),
    amount: 0,
    category: "",
    description: "",
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

  console.log(formData);

  return (
    <form className="mt-4 flex flex-col gap-4">
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
            defaultValue={0.0}
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
          onChange={handleFormChange}
          type="text"
          required={false}
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default TransactionForm;
