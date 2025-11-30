import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import type { SetStateAction } from "react";

interface Props {
	totalPages: number;
	handlePageClick: React.Dispatch<SetStateAction<number>>;
}

const PaginationPages = ({ totalPages, handlePageClick }: Props) => {
	return (
		<>
			{" "}
			<ReactPaginate
				breakLabel="..."
				nextLabel="⇒"
				onPageChange={({ selected }) => handlePageClick(selected + 1)}
				pageRangeDisplayed={5}
				marginPagesDisplayed={1}
				pageCount={totalPages}
				previousLabel="⇐"
				renderOnZeroPageCount={null}
				containerClassName={css.pagination}
				activeClassName={css.active}
			/>
		</>
	);
};

export default PaginationPages;
