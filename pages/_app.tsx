import { Analytics } from "@vercel/analytics/react";
import { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../src/themes";
import "../src/styles/globals.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useMounted from "../src/hooks/use-mounted";
import useQueryNetwork from "../src/hooks/use-query-network";
import { useEffect } from "react";
import { useRouter } from "next/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  const mounted = useMounted();

  const router = useRouter();

  const { query, isValidQuery } = useQueryNetwork();

  useEffect(() => {
    if (isValidQuery || !router.isReady) return;

    router.push({ query: { network: "mainnet" } });
  }, [query]);

  if (!mounted) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <AppCacheProvider {...props}>
        <ThemeProvider theme={theme("light")}>
          <CssBaseline />
          <Component {...pageProps} />
          <Analytics />
        </ThemeProvider>
      </AppCacheProvider>
    </QueryClientProvider>
  );
}
