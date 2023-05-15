import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import React, { type Dispatch, type SetStateAction } from "react";

import { HiCash, HiClipboardList, HiCreditCard, HiUser } from "react-icons/hi";
import Link from "next/link";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const Nav = ({ sidebarOpen, setSidebarOpen }: Props) => {
  const user = useUser();

  return (
    <>
      <aside
        id="logo-sidebar"
        className={`fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform dark:border-gray-700 dark:bg-gray-800 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : ""
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/"
                className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>

                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/transactions"
                className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <HiClipboardList className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                <span className="ml-3 flex-1 whitespace-nowrap">
                  Transactions
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/subscriptions"
                className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <HiCash className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                <span className="ml-3 flex-1 whitespace-nowrap">
                  Subscriptions
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/credit-cards"
                className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <HiCreditCard className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                <span className="ml-3 flex-1 whitespace-nowrap">
                  Credit Cards
                </span>
              </Link>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <HiUser className="mr-3 h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                {user.isSignedIn ? <SignOutButton /> : <SignInButton />}
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div
        className={`${
          sidebarOpen ? "lg:hidden" : "hidden"
        } fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/90`}
        id="sidebarBackdrop"
        onClick={() => setSidebarOpen(false)}
      ></div>
    </>
  );
};

export default Nav;
