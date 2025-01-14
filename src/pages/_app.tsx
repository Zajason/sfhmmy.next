import "../styles/global.css";
import type { AppProps } from "next/app";
import { MockAuthProvider } from "../context/mockAuthContext"; // Adjust path if necessary
import { ThemeProvider } from "../utils/ThemeContext"; // Adjust path if necessary
import PageLayout from "../components/PageLayout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <MockAuthProvider>
      <PageLayout isLoggedIn={false}>
        <Component {...pageProps} />
        </PageLayout>
      </MockAuthProvider>
    </ThemeProvider>
  );
}
