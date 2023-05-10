import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import React from "react";
import { Sidebar } from "flowbite-react";
import {
  HiCash,
  HiChartPie,
  HiClipboardList,
  HiCreditCard,
  HiUser,
} from "react-icons/hi";

const Nav = () => {
  const user = useUser();

  return (
    <div className="w-fit">
      <Sidebar aria-label="Default sidebar example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/transactions" icon={HiClipboardList}>
              Transactions
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiCash}>
              Subscriptions
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiCreditCard}>
              Credit cards
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              {user.isSignedIn ? <SignOutButton /> : <SignInButton />}
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default Nav;
