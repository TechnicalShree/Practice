import React from "react";

export default function NavigateToPage(props) {
  const prevHandler = () => {
    if (props.currPage > 1) {
      props.setCurrPage(props.currPage - 1);
    }
  };

  const nextHandler = () => {
    if (props.currPage < props.noOfTotalPages) {
      props.setCurrPage(props.currPage + 1);
    }
  };

  return (
    <div className="pages">
      <span onClick={prevHandler}>Prev - </span>
      {props.pages.map((page) => (
        <>
          <span
            key={page}
            onClick={() => {
              props.setCurrPage(page);
            }}
            className={props.currPage === page ? "active" : ""}
          >
            {page}
          </span>{" "}
          -
        </>
      ))}
      <span onClick={nextHandler}> - Next</span>
    </div>
  );
}
