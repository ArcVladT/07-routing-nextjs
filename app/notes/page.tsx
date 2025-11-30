import { redirect } from "next/navigation";

const NotesPageRedirect = () => {
	redirect("/notes/filter/all");
	return null;
};

export default NotesPageRedirect;
