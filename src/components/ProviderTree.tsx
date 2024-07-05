import { SidebarProvider } from "@/context/SidebarContext";
import { PathProvider } from "@/context/currentPathContext";
import { SelectedItemProvider } from "@/context/currentSelectedHeader";
import { CurrentURLProvider } from "@/context/currentURLContext";
import { HeaderDataProvider } from "@/context/headerDataContext";
import { ProductSwitchProvider } from "@/context/productSwitchContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@ui5/webcomponents-react";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

interface ProviderTreeProps {
    children: ReactNode;
}

const ProviderTree = ({ children }: ProviderTreeProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <BrowserRouter>
                    <HeaderDataProvider>
                        <SelectedItemProvider>
                            <SidebarProvider>
                                <PathProvider>
                                    <CurrentURLProvider>
                                        <ProductSwitchProvider>
                                            {children}
                                        </ProductSwitchProvider>
                                    </CurrentURLProvider>
                                </PathProvider>
                            </SidebarProvider>
                        </SelectedItemProvider>
                    </HeaderDataProvider>
                </BrowserRouter>
            </ThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default ProviderTree;
