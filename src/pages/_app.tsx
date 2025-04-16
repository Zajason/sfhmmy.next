import "../styles/global.css";
import type { AppProps } from "next/app";
import { useRouter } from 'next/router';
import { ThemeProvider } from "../utils/ThemeContext";
import PageLayout from "../components/PageLayout";
import { AuthProvider } from "../context/authContext";
import Head from 'next/head';

// Function to generate page-specific titles
function getPageTitle(pathname: string): string {
  // Map routes to their specific titles
  const titles: Record<string, string> = {
    '/': 'ΣΦΗΜΜΥ16 - Συνέδριο Φοιτητών Ηλεκτρολόγων Μηχανικών & Μηχανικών Υπολογιστών',
    '/about': 'Σχετικά με το ΣΦΗΜΜΥ16',
    '/profile': 'Το προφίλ μου | ΣΦΗΜΜΥ16',
    '/register': 'Εγγραφή | ΣΦΗΜΜΥ16',
    '/signIn': 'Σύνδεση | ΣΦΗΜΜΥ16',
    '/agenda': 'Πρόγραμμα | ΣΦΗΜΜΥ16',
    '/sponsors': 'Χορηγοί | ΣΦΗΜΜΥ16',
    '/members': 'Οργανωτική Επιτροπή | ΣΦΗΜΜΥ16',
    '/workshops': 'Εργαστήρια | ΣΦΗΜΜΥ16',
    '/contact': 'Επικοινωνία | ΣΦΗΜΜΥ16',
    '/career': 'Καριέρα | ΣΦΗΜΜΥ16',
    '/update': 'Ενημερώσεις | ΣΦΗΜΜΥ16',
  };

  return titles[pathname] || 'ΣΦΗΜΜΥ16 - Συνέδριο Ηλεκτρολόγων Μηχανικών & Μηχανικών Υπολογιστών';
}

function MyAppContent({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  )
}

export default function MyApp({ Component, pageProps, router }: AppProps) {
  // Get the current route for dynamic title generation
  const { pathname } = useRouter();
  const pageTitle = getPageTitle(pathname);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="16ο Συνέδριο Φοιτητών Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών" />
      </Head>
      <ThemeProvider>
        <AuthProvider>
          <MyAppContent Component={Component} pageProps={pageProps} router={router} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}