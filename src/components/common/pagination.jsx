import React, { useEffect, useState } from "react";

const Pagination = ({ pages, setCurrentPage }) => {
  const numOfPages = [];

  for (let i = 1; i <= pages; i++) {
    numOfPages.push(i);
  }

  const [currentButton, setCurrentButton] = useState(1);
  useEffect(() => {
    setCurrentPage(currentButton);
    return () => {};
  }, [currentButton, setCurrentPage]);
  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-center mt-5">
        <li
          className={`${
            currentButton === 1 ? "page-item disabled" : "page-item"
          }`}
          onClick={() =>
            setCurrentButton((prev) => (prev === 1 ? prev : prev - 1))
          }
        >
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        {numOfPages.map((page, index) => {
          return (
            <li
              key={index}
              className={`${
                currentButton === page ? "page-item active" : "page-item"
              }`}
              onClick={() => setCurrentButton(page)}
            >
              <a className="page-link">{page}</a>
            </li>
          );
        })}
        <li
          className={`${
            currentButton === numOfPages.length
              ? "page-item disabled"
              : "page-item"
          }`}
          onClick={() =>
            setCurrentButton((next) =>
              next === numOfPages.length ? next : next + 1
            )
          }
        >
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
