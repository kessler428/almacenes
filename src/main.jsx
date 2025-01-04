import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./assets/css/app.css";
import { store } from "./redux/store";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store)

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);
