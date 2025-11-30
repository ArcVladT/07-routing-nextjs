import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteList.module.css";
import type { Note } from "@/types/note";
import { deleteNote } from "@/lib/api/noteService";
import Link from "next/link";

interface NoteListProps {
	notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
	const qClient = useQueryClient();

	const mutationDelete = useMutation({
		mutationFn: deleteNote,
		onSuccess: () => {
			qClient.invalidateQueries({ queryKey: ["notes"] });
		},
	});

	if (notes.length < 1) return;
	return (
		<div>
			<ul className={css.list}>
				{notes.map((note) => (
					<li className={css.listItem} key={note.id}>
						<h2 className={css.title}>{note.title}</h2>
						<p className={css.content}>{note.content}</p>
						<div className={css.footer}>
							<span className={css.tag}>{note.tag}</span>
							<Link href={`/notes/${note.id}`}>View Details</Link>
							<button
								onClick={() => mutationDelete.mutate(note.id)}
								className={css.button}
							>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NoteList;
