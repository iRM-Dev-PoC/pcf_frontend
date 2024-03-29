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

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundary fallback={<ErrorPage />}>
			<ThemeProvider>
				<BrowserRouter>
					<SidebarProvider>
						<PathProvider>
							<CurrentURLProvider>
								<Suspense fallback={<Loading />}>
									<App />
								</Suspense>
							</CurrentURLProvider>
						</PathProvider>
					</SidebarProvider>
				</BrowserRouter>
			</ThemeProvider>
		</ErrorBoundary>
	</StrictMode>
);
