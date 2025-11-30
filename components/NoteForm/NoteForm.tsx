import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import { type NoteTag, type FormValues } from "@/types/note";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/api";

interface NoteFormProps {
	closeModal: () => void;
}

const NoteForm = ({ closeModal }: NoteFormProps) => {
	const validationSchema = Yup.object({
		title: Yup.string()
			.min(3, "At least 3 characters")
			.max(50, "max 50")
			.required("Title is required"),
		content: Yup.string().max(500, "max 50"),
		tag: Yup.mixed<NoteTag>()
			.oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
			.required("Tag is required"),
	});

	const onSubmitForm = (
		values: FormValues,
		formAction: FormikHelpers<FormValues>
	) => {
		mutationCreate.mutate(values);

		formAction.resetForm();
		closeModal();
	};

	const qClient = useQueryClient();

	const mutationCreate = useMutation({
		mutationFn: createNote,
		onSuccess: () => {
			qClient.invalidateQueries({ queryKey: ["notes"] });
		},
	});

	return (
		<div>
			<Formik
				initialValues={{
					title: "",
					content: "",
					tag: "Todo",
				}}
				onSubmit={onSubmitForm}
				validationSchema={validationSchema}
			>
				<Form className={css.form}>
					<div className={css.formGroup}>
						<label htmlFor="title">Title</label>
						<Field id="title" type="text" name="title" className={css.input} />
						<ErrorMessage name="title" className={css.error} />
					</div>

					<div className={css.formGroup}>
						<label htmlFor="content">Content</label>
						<Field
							as="textarea"
							id="content"
							name="content"
							rows={8}
							className={css.textarea}
						/>
						<ErrorMessage name="content" className={css.error} />
					</div>

					<div className={css.formGroup}>
						<label htmlFor="tag">Tag</label>
						<Field as="select" id="tag" name="tag" className={css.select}>
							<option value="Todo">Todo</option>
							<option value="Work">Work</option>
							<option value="Personal">Personal</option>
							<option value="Meeting">Meeting</option>
							<option value="Shopping">Shopping</option>
						</Field>
						<ErrorMessage name="tag" className={css.error} />
					</div>

					<div className={css.actions}>
						<button
							onClick={closeModal}
							type="button"
							className={css.cancelButton}
						>
							Cancel
						</button>
						<button type="submit" className={css.submitButton} disabled={false}>
							Create note
						</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default NoteForm;
