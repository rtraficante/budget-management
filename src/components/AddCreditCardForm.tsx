import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { api } from "~/utils/api";

const AddCreditCardForm = () => {
  const [formData, setFormData] = useState({
    dueDate: 1,
    provider: "",
    nickname: "",
  });

  const ctx = api.useContext();

  const { mutate, error } = api.creditCard.add.useMutation({
    onSuccess: () => {
      setFormData({
        dueDate: 1,
        provider: "",
        nickname: "",
      });
      void ctx.creditCard.getAll.invalidate();
    },
  });

  const handleFormChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  return (
    <form
      className=" flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ ...formData, dueDate: Number(formData.dueDate) });
      }}
    >
      <div className="flex flex-col gap-4">
        <div>
          <p>{error?.message}</p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="due-date" value="Monthly Due Date" />
            </div>
            <TextInput
              id="due-date"
              name="dueDate"
              type="number"
              min={1}
              max={31}
              value={formData.dueDate}
              onChange={handleFormChange}
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="provider" value="Provider" />
            </div>
            <TextInput
              id="provider"
              name="provider"
              type="text"
              placeholder="VISA, AMEX, etc."
              value={formData.provider}
              onChange={handleFormChange}
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="nickname" value="Nickname" />
            </div>
            <TextInput
              id="nickname"
              name="nickname"
              type="text"
              placeholder=""
              value={formData.nickname}
              onChange={handleFormChange}
              required={true}
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="bg-blue-700 enabled:hover:bg-blue-800">Submit</Button>
    </form>
  );
};

export default AddCreditCardForm;
