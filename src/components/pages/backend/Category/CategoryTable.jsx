import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";
import SearchBarWithFilterStatus from "@/components/partials/SearchBarWithFilterStatus";
import Status from "@/components/partials/Status";
import ModalArchive from "@/components/partials/modal/ModalArchive";
import ModalRestore from "@/components/partials/modal/ModalRestore";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaArchive, FaEdit, FaTrash, FaTrashRestoreAlt } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import IconNoData from "../partials/IconNoData";
import IconServerError from "../partials/IconServerError";
import LoadMore from "../partials/LoadMore";
import TableLoader from "../partials/TableLoader";
import ModalDelete from "../partials/modals/ModalDelete";

const CategoryTable = ({ setItemEdit, setIsCategoryEdit, isCategoryEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isActive, setIsActive] = React.useState(0);
  const [id, setIsId] = React.useState("");
  const [isFilter, setIsFilter] = React.useState(false);
  const [onSearch, setOnSearch] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState("");
  const search = React.useRef({ value: "" });
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  let counter = 1;

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setIsId(item.category_aid);
  };
  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setIsId(item.category_aid);
  };
  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setIsId(item.category_aid);
  };
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setIsCategoryEdit(item);
  };

  // const {
  //   isLoading,
  //   isFetching,
  //   error,
  //   data: result,
  //   status,
  // } = useQueryData(
  //   `/v2/category`, //endpoint
  //   "get", //method
  //   "category" //key
  // );

  const {
    data: result,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["category", onSearch, isFilter, statusFilter],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        "/v2/category/search", //search or filter endpoint
        `/v2/category/page/${pageParam}`, //page api/endpoint
        isFilter || store.isSearch, //search boolean
        {
          statusFilter,
          isFilter,
          searchValue: search?.current.value,
          id: "",
        } //payload
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }

      return;
    },
    refetchOnWindowFocus: false,
  });
  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div>
        <SearchBarWithFilterStatus
          search={search}
          dispatch={dispatch}
          store={store}
          result={result}
          isFetching={isFetching}
          setOnSearch={setOnSearch}
          onSearch={onSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          setIsFilter={setIsFilter}
        />
      </div>
      <div className="relative">
        <div className="mt-10 bg-secondary rounded-md p-4 border border-line relative">
          <div className="table-wrapper custom-scroll">
            {/* <TableLoader count={10} cols={4}/> */}
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Status</th>
                  <th className="w-[50%]">Title</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(status === "pending" ||
                  result?.pages[0].data.length === 0) && (
                  <tr>
                    <td colSpan="100%" className="p-10">
                      {status === "pending" ? (
                        <TableLoader cols={2} count={20} />
                      ) : (
                        <IconNoData />
                      )}
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan="100%">
                      <IconServerError />
                    </td>
                  </tr>
                )}
                {/* Result */}
                {result?.pages.map((page, pageKey) => (
                  <React.Fragment key={pageKey}>
                    {page.data.map((item, key) => {
                      return (
                        <tr key={key} className="group relative cursor-pointer">
                          <td className="text-center">{counter++}</td>
                          <td>
                            {item.category_is_active ? (
                              <Status text={"Active"} />
                            ) : (
                              <Status text={"Inacive"} />
                            )}
                          </td>
                          <td>{item.category_title}</td>
                          <td
                            colSpan="100%"
                            className="opacity-0 group-hover:opacity-100"
                          >
                            <div className="flex items-center justify-end gap-2 mr-4">
                              {item.category_is_active == 1 ? (
                                <>
                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Edit"
                                    disabled={isFetching}
                                    onClick={() => handleEdit(item)}
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Archive"
                                    disabled={isFetching}
                                    onClick={() => handleArchive(item)}
                                  >
                                    <FaArchive />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Restore"
                                    disabled={isFetching}
                                    onClick={() => handleRestore(item)}
                                  >
                                    <FaTrashRestoreAlt />
                                  </button>
                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Delete"
                                    disabled={isFetching}
                                    onClick={() => handleDelete(item)}
                                  >
                                    <FaTrash />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <div className="pb-10 flex items-center justify-center text-white">
              <LoadMore
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
                hasNextPage={hasNextPage}
                result={result?.pages[0]}
                setPage={setPage}
                page={page}
                refView={ref}
              />
            </div>
          </div>
        </div>
      </div>
      {/* {store.isDelete && <ModalDelete/>} */}
      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`/v2/category/${id}`}
          queryKey="category"
        />
      )}
      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          mysqlEndpoint={`/v2/category/active/${id}`}
          queryKey={"category"}
        />
      )}

      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          mysqlEndpoint={`/v2/category/active/${id}`}
          queryKey={"category"}
        />
      )}

      {/* {store.isConfirm && (
                        <ModalConfirm
                        queryKey="category"
                        mysqlApiArchive={`/v2/category/active/${id}`}
                        active={isActive}/>
                        )} */}
      {/* {store.isView && <ModalViewMovie movieInfo={movieInfo}/>} */}
    </>
  );
};

export default CategoryTable;
