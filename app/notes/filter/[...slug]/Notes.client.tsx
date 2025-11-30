"use client";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import css from "@/components/NotesPages/NotePage.module.css";
import PaginationPages from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { FetchNotesResponse, NoteTag } from "@/types/note";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

interface NotesClientProps {
	initialNotes: FetchNotesResponse;
	initialTag?: NoteTag;
}

const NotesClient = ({ initialNotes, initialTag }: NotesClientProps) => {
	const [query, setQuery] = useState("");
	const [debounceQuery] = useDebounce(query, 300);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [page, setPage] = useState(1);

	const { data = initialNotes } = useQuery({
		queryKey: ["notes", page, debounceQuery, initialTag],
		queryFn: () => fetchNotes(page, debounceQuery, initialTag),
		placeholderData: keepPreviousData,
	});

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<div className={css.app}>
				<header className={css.toolbar}>
					<SearchBox onUpdate={setQuery} />
					<PaginationPages
						totalPages={data?.totalPages}
						handlePageClick={setPage}
					/>
					<button onClick={openModal} className={css.button}>
						Create note +
					</button>
				</header>
				<NoteList notes={data?.notes}></NoteList>
				{isModalOpen && (
					<Modal closeModal={closeModal}>
						<NoteForm closeModal={closeModal} />
					</Modal>
				)}
			</div>
		</>
	);
};

export default NotesClient;
