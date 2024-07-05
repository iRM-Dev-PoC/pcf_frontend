import App from "@/App.tsx";
import ErrorBoundary from "@/components/ErrorBoundary.tsx";
import ErrorPage from "@/components/ErrorPage.tsx";
import Loading from "@/components/Loading.tsx";
import ProviderTree from "@/components/ProviderTree";
import "@/index.css";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/Assets.js";
import "@ui5/webcomponents/dist/Assets.js";
import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ErrorBoundary fallback={<ErrorPage />}>
            <ProviderTree>
                <Suspense fallback={<Loading />}>
                    <App />
                    <Toaster />
                </Suspense>
            </ProviderTree>
        </ErrorBoundary>
    </StrictMode>
);
