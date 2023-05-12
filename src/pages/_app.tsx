import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Nav from "~/components/Nav";
import Header from "~/components/Header";
import { useState } from "react";
import Layout from "~/components/Layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ClerkProvider {...pageProps}>
      <div className="flex">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Nav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
