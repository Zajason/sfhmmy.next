import "../styles/global.css";
import type { AppProps } from "next/app";
import { MockAuthProvider } from "../context/mockAuthContext";
import { ThemeProvider } from "../utils/ThemeContext";
import PageLayout from "../components/PageLayout";
import { AuthProvider } from "../context/authContext";

function MyAppContent({ Component, pageProps }: AppProps) {
  
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  )
}

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MyAppContent Component={Component} pageProps={pageProps} router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}