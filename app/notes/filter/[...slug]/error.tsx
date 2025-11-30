"use client";

interface ErrorListProps {
	error: Error;
	reset: () => void;
}

const ErrorList = ({ error, reset }: ErrorListProps) => {
	return (
		<div>
			<p>Could not fetch the list of notes. {error.message}</p>
			<button onClick={reset}>Try again</button>
		</div>
	);
};

export default ErrorList;
