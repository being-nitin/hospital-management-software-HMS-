import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./Routes";
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


ReactDOM.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
        <Routes/>
        </QueryClientProvider>
    </Provider>,
    document.getElementById('root')
);
