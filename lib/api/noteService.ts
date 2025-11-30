import { type Note, type FormValues, NoteTag } from "@/types/note";
import axios from "axios";

const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const BASE_URL = "https://notehub-public.goit.study/api/notes";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: `Bearer ${myToken}`,
	},
});

// interface FetchNotesProps {
// 	page: number;
// 	query: string;
// }

export async function fetchNotes(
	page: number = 1,
	query: string = "",
	tag?: NoteTag
) {
	const res = await axiosInstance.get("", {
		params: {
			page: page,
			search: query,
			perPage: 12,
			tag: tag,
		},
	});

	return res.data;
}

export async function createNote(params: FormValues): Promise<Note> {
	const res = await axiosInstance.post("", params);

	return res.data;
}

export async function deleteNote(id: string) {
	const res = await axiosInstance.delete(`/${id}`);

	return res.data;
}

export async function fetchNoteById(id: string) {
	const res = await axiosInstance.get(`/${id}`);

	return res.data;
}
