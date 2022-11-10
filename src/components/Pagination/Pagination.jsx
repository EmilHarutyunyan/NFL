import {usePagination,DOTS} from "../../hooks/usePagination";
import React from "react";
import { ReactComponent as Arrow } from "../../assets/svg/arrow.svg";
import { Li, Ul, Wrapper } from "./Pagination.styles";
const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  previous,
  next
},props) => {

  
console.log('🚀 ~ file: Pagination.jsx ~ line 14 ~ props', props)

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  console.log('🚀 ~ file: Pagination.jsx ~ line 20 ~ paginationRange', paginationRange)

if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  // let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <Wrapper>
      <Ul
      >
        <Li
          
          onClick={()=> {
            if(previous){
              onPrevious()
            }
            }
            }
          className={previous ? '': 'disable-arrow'}
        >
        <Arrow className="arrow arrow-left" /> 
        </Li>
        {paginationRange.map((pageNumber,idx) => {
          if (pageNumber === DOTS) {
            return <Li className="dots" key={idx}>&#8230;</Li>;
          }

          return (
            <Li
              key={idx}
              className={pageNumber === currentPage ? 'active': 'pageNumber'}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Li>
          );
        })}
        <Li
          
          onClick={()=> {
            if(next) {
              onNext()
            }
            }}
           className={next ? '': 'disable-arrow'}
        >
          <Arrow className="arrow arrow-right" /> 
        </Li>
      </Ul>
    </Wrapper>
  );
};

export default Pagination;
