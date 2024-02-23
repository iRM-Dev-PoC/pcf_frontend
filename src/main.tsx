import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext.tsx";
import { ThemeProvider } from "@ui5/webcomponents-react";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import Loading from "./components/Loading.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundary fallback={<Loading />}>
			<ThemeProvider>
				<BrowserRouter>
					<SidebarProvider>
						<App />
					</SidebarProvider>
				</BrowserRouter>
			</ThemeProvider>
		</ErrorBoundary>
	</StrictMode>
);
