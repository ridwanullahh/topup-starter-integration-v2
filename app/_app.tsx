
import '../styles/globals.css';
import NavBar from '../components/NavBar';
import { SessionProvider } from 'next-auth/react';
import Footer from '../components/Footer';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
<SessionProvider session={pageProps.session}>
  <NavBar />
  <Component {...pageProps} />
  <Footer />
</SessionProvider>
  );
}

export default MyApp;
