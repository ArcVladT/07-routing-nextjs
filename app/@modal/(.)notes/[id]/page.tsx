import NotePreviewClient from "./NotePreview.client";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

interface Props {
	params: Promise<{ id: string }>;
}

const NotePreview = async ({ params }: Props) => {
	const { id } = await params;

	const qClient = new QueryClient();

	await qClient.prefetchQuery({
		queryKey: ["note", id],
		queryFn: () => fetchNoteById(id),
	});

	return (
		<div>
			<HydrationBoundary state={dehydrate(qClient)}>
				<NotePreviewClient noteId={id} />
			</HydrationBoundary>
		</div>
	);
};

export default NotePreview;
