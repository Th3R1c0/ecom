import type { AppProps } from "next/app";

import "@/styles/global.css";
import { Provider } from 'react-redux';
import store from '../store.js'
import Layout from '../components/Layout'
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
    <Provider store={store}>
  <Component {...pageProps} />
  </Provider>
  </Layout>)
  ;
};

export default App;
