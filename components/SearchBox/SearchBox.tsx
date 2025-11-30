import React from "react";
import css from "./SearchBox.module.css";
import type { SetStateAction } from "react";

interface SearchBoxProps {
	onUpdate: React.Dispatch<SetStateAction<string>>;
}

const SearchBox = ({ onUpdate }: SearchBoxProps) => {
	const inputValue = (input: React.ChangeEvent<HTMLInputElement>) => {
		onUpdate(input.currentTarget.value);
	};

	return (
		<div>
			<input
				onChange={inputValue}
				className={css.input}
				type="text"
				placeholder="Search notes"
			/>
		</div>
	);
};

export default SearchBox;
