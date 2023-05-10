import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Nav from "~/components/Nav";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <div className="flex">
        <Nav />
        <Component {...pageProps} className="flex-1" />
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
