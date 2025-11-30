"use client";

interface ErrorPageMessageProps {
	error: Error;
}

const errorPageMessage = ({ error }: ErrorPageMessageProps) => {
	return (
		<div>
			<p>Could not fetch the list of notes. {error.message}</p>
		</div>
	);
};

export default errorPageMessage;
