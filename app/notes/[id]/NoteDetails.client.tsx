"use client";

import css from "@/components/NoteDetails/NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api/noteService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const NoteDetailsClient = () => {
	const { id } = useParams<{ id: string }>();

	const {
		data: note,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["note", id],
		queryFn: () => fetchNoteById(id),
		refetchOnMount: false,
	});

	if (isLoading) return <p>Loading, please wait...</p>;
	if (error || !note) return <p>Something went wrong.</p>;

	return (
		<div>
			NoteDetail
			<main className={css.main}>
				<div className={css.container}>
					<div className={css.item}>
						<div className={css.header}>
							<h2>{note.title}</h2>
						</div>
						<p className={css.content}>{note.content}</p>
						<p className={css.date}>
							{note.updatedAt
								? `Updated at ${new Date(note.updatedAt).toLocaleString()}`
								: `Created at ${new Date(note.createdAt).toLocaleString()}`}
						</p>
					</div>
				</div>
			</main>
		</div>
	);
};

export default NoteDetailsClient;
