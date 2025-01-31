import React from "react";
import { imgPath } from "../../helpers/functions-general";
import useQueryData from "@/components/custom-hook/useQueryData";
import TableLoader from "@/components/partials/TableLoader";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";

const SideNav = ({ setCategoryId, isLoading, isFetching, result }) => {
  const handleClickCategory = (item) => {
    setCategoryId(item.category_aid);
  };

  return (
    <>
      <h5 className="mb-0 text-center pt-2 text-sm">Menu</h5>

      <ul className="relative">
        {isFetching && !isLoading && <FetchingSpinner />}
        {isLoading && <TableLoader cols={1} count={15} />}
        
        
      { !isLoading && ( <button
          type="button"
          onClick={() => handleClickCategory({ category_aid: "" })}
          className="w-full mx-auto"
        >
          <img
            src={`${imgPath}/jollibeelogo.png`}
            className="w-16 mx-auto py-2"
          />
          <small className="text-xs">All</small>
        </button>)}

        {result?.count > 0 &&
          result.data.map((item, key) => (
            <li className="mb-3" key={key}>
              <button type="button" onClick={() => handleClickCategory(item)}>
                <img src={`${imgPath}/${item.category_image}`} />
                <small className="text-xs">{item.category_title}</small>
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default SideNav;
