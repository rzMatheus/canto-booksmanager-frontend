import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "@/lib/apollo/client.ts";
import {Provider} from "react-redux";
import store from "@/features/state/store.redux.ts";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ApolloProvider client={apolloClient}>
            <App />
        </ApolloProvider>
    </Provider>
        ,
)
