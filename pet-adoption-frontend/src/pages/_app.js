import React from 'react';
import Head from 'next/head';
import { Provider as ReduxProvider } from 'react-redux';

import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { CssBaseline } from '@mui/material';

import { PetAdoptionThemeProvider } from '@/utils/theme';
import { buildStore } from '@/utils/redux';

import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit/AuthProvider';

import '@/styles/globals.css'

// Initialize Auth
const store = createStore({
  authName:"__auth",
  authType:"cookie",
  cookieDomain:'localhost',
  cookieSecure:false,
})

// Initialize Redux
let initialState = {};
let reduxStore = buildStore(initialState);

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider store={store}>
      <ReduxProvider store={reduxStore}>
          <AppCacheProvider>
            <Head>
              <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
              <link rel='icon' href='/favicon.ico' />
            </Head>

            <PetAdoptionThemeProvider>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />

              <Component {...pageProps} />
            </PetAdoptionThemeProvider>
          </AppCacheProvider>
      </ReduxProvider>
    </AuthProvider>
  );
}
