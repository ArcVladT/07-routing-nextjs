import NotesClient from "./Notes.client";
import { QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";

interface Props {
	params: Promise<{ slug: string[] }>;
}

const NotesPage = async ({ params }: Props) => {
	const { slug } = await params;
	const res = slug?.[0];

	const tag: NoteTag | undefined =
		!res || res.toLowerCase() === "all" ? undefined : (res as NoteTag);

	const queryClient = new QueryClient();

	const initialNotes = await queryClient.fetchQuery({
		queryKey: ["notesFetch", 1, tag],
		queryFn: () => fetchNotes(1, "", tag),
	});

	return (
		<div>
			<NotesClient initialNotes={initialNotes} initialTag={tag}></NotesClient>
		</div>
	);
};

export default NotesPage;
