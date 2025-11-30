import { fetchNoteById } from "@/lib/api";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

interface NoteDetailsProps {
	params: Promise<{ id: string }>;
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
	const { id } = await params;
	const qClient = new QueryClient();

	await qClient.prefetchQuery({
		queryKey: ["note", id],
		queryFn: () => fetchNoteById(id),
	});

	return (
		<HydrationBoundary state={dehydrate(qClient)}>
			<NoteDetailsClient />
		</HydrationBoundary>
	);
};

export default NoteDetails;
