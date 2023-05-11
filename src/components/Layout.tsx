import React from "react";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="relative h-full min-h-screen w-full overflow-y-auto bg-gray-50 p-4 dark:bg-gray-900 lg:ml-64">
      {children}
    </div>
  );
};

export default Layout;
