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
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/log.js";
import "@ui5/webcomponents-icons/dist/full-screen.js";
import "@ui5/webcomponents-icons/dist/wrench.js";
import "@ui5/webcomponents-icons/dist/customer-order-entry.js";
import "@ui5/webcomponents-icons/dist/add-employee.js";
import "@ui5/webcomponents-icons/dist/permission.js";
import "@ui5/webcomponents-icons/dist/key.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/customer-and-contacts.js";
import "@ui5/webcomponents-icons/dist/drop-down-list.js";
import "@ui5/webcomponents-icons/dist/manager-insight.js";
import "@ui5/webcomponents-icons/dist/role.js";
import "@ui5/webcomponents-icons/dist/provision.js";
import "@ui5/webcomponents-icons/dist/flight.js";
import "@ui5/webcomponents-icons/dist/contacts.js";
import "@ui5/webcomponents-icons/dist/business-objects-experience.js";
import "@ui5/webcomponents-icons/dist/activity-individual.js";
import "@ui5/webcomponents-icons/dist/process.js";
import "@ui5/webcomponents-icons/dist/person-placeholder.js";
import "@ui5/webcomponents-icons/dist/delete.js";
import "@ui5/webcomponents-icons/dist/exit-full-screen.js";
import "@ui5/webcomponents-icons/dist/flag-2.js";
import "@ui5/webcomponents-icons/dist/create.js";
import "@ui5/webcomponents-icons/dist/detail-view.js";
import "@ui5/webcomponents-icons/dist/synchronize.js";
import "@ui5/webcomponents-icons/dist/performance.js";
import "@ui5/webcomponents-icons/Assets.js";
import "@ui5/webcomponents-icons/AllIcons.js";
import "@ui5/webcomponents/Assets.js";
import "@ui5/webcomponents-localization/Assets.js";

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
