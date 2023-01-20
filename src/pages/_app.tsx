import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { Container } from "../components/Container";
import { LoginBanner } from "../components/LoginBanner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<Container>
				<main>
					<Component {...pageProps} />
				</main>
			</Container>
			<LoginBanner />
			<ReactQueryDevtools initialIsOpen={false}/>
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
