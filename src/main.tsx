import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext.tsx";
import { ThemeProvider } from "@ui5/webcomponents-react";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import Loading from "./components/Loading.tsx";
import { PathProvider } from "./context/currentPathContext.tsx";
import { CurrentURLProvider } from "./context/currentURLContext.tsx";
import { ProductSwitchProvider } from "./context/productSwitchContext.tsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ErrorBoundary fallback={<ErrorPage />}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <BrowserRouter>
                        <SidebarProvider>
                            <PathProvider>
                                <CurrentURLProvider>
                                    <ProductSwitchProvider>
                                        <Suspense fallback={<Loading />}>
                                            <App />
                                            <Toaster />
                                            <ReactQueryDevtools />
                                        </Suspense>
                                    </ProductSwitchProvider>
                                </CurrentURLProvider>
                            </PathProvider>
                        </SidebarProvider>
                    </BrowserRouter>
                </ThemeProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    </StrictMode>
);
