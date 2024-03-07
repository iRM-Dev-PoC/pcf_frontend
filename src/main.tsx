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
// import Auth from "./pages/auth";
// import ResetPassword from "./components/ResetPassword";
// import SignIn from "./components/Sign-In";

ReactDOM.createRoot(document.getElementById("root")!).render(
	
		<ErrorBoundary fallback={<ErrorPage />}>
				<ThemeProvider>
				<BrowserRouter>
					<SidebarProvider>
						<PathProvider>
							<Suspense fallback={<Loading />}>
							{/* <Auth
                  onSignInSuccess={() => {
                    // Once sign-in is successful, render the main application (App)
                    ReactDOM.createRoot(document.getElementById("root")!).render(
                      <App />
                    );
                  }}
                /> */}
								<App />
							</Suspense>
						</PathProvider>
					</SidebarProvider>
				</BrowserRouter>
			</ThemeProvider>
		</ErrorBoundary>
	
	 
);
