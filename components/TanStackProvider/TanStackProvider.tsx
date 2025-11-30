"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const qClient = new QueryClient();

interface TanstackChildProps {
	children: React.ReactNode;
}

const TanStackProvider = ({ children }: TanstackChildProps) => {
	return (
		<>
			<QueryClientProvider client={qClient}>{children}</QueryClientProvider>
		</>
	);
};

export default TanStackProvider;
