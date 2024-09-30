// pages/_app.tsx
import { AppType } from 'next/app';
import { trpc, trpcClient } from '../utils/trpc'; // Adjust path to your utils file
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import Header from './header';

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
 
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <Header/>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default MyApp;
