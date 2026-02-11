import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from '../redux/store';
import MainLayout from '../components/layouts/MainLayout';
import PropTypes from "prop-types";
import '../styles/main.scss';
import useEruda from "@/hooks/useEruda";
import {
  onResize
} from "../constants/adaptive-settings";
import Head from "next/head";
import BurgerProvider from "../providers/BurgerProvider";

const MyApp = ({Component, pageProps}) => {
  useEruda();

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize()
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover, target-densitydpi=medium-dpi"
        />
      </Head>
      <BurgerProvider>

        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </BurgerProvider>
    </Provider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object
};

export default MyApp;
