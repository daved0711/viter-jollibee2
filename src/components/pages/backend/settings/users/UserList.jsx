import useQueryData from "@/components/custom-hook/useQueryData";
import ModalArchive from "@/components/partials/modal/ModalArchive";
import ModalDelete from "@/components/partials/modal/ModalDelete";
import ModalRestore from "@/components/partials/modal/ModalRestore";
import { StoreContext } from "@/components/store/storeContext";
import { Archive, ArchiveRestore, FilePenLine, Trash2 } from "lucide-react";
import React from "react";
import IconNoData from "../../partials/IconNoData";
import IconServerError from "../../partials/IconServerError";
import SpinnerTable from "../../partials/spinners/SpinnerTable";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";
import TableLoader from "../../partials/TableLoader";
import Pills from "../../partials/Pills";
import Status from "@/components/partials/Status";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "@/components/store/storeAction";

const UserList = ({ setItemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [id, setIsId] = React.useState(null);
  const [dataItem, setDataItem] = React.useState(null);

  let counter = 1;

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setIsId(item.user_aid);
    setDataItem(item);
  };
  const handleRestore = (item) => {
    dispatch(setIsRestore(true)); //confirm
    setIsId(item.user_aid);
  };
  const handleArchive = (item) => {
    dispatch(setIsArchive(true)); //confirm
    setIsId(item.user_aid);
  };
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const {
    isLoading,
    isFetching,
    error,
    data: result,
    status,
  } = useQueryData(
    `/v2/user`, //endpoint
    "get", //method
    "user" //key
  );
  return (
    <>
      <div className="mt-10 bg-secondary rounded-md p-4 border border-line relative">
        {isFetching && !isLoading && <FetchingSpinner />}
        <div className="table-wrapper custom-scroll">
          {/* <TableLoader count={10} cols={4}/> */}
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan="100%">
                    <TableLoader count={20} cols={5} />
                  </td>
                </tr>
              )}

              {result?.count === 0 && (
                <tr>
                  <td colSpan={100}>
                    <IconNoData />
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={100}>
                    <IconServerError />
                  </td>
                </tr>
              )}
              {result?.count > 0 &&
                result.data.map((item, key) => (
                  <tr key={key}>
                    <td>{counter++}</td>
                    <td>
                      {item.user_is_active === 1 ? (
                        <Status text="Active" />
                      ) : (
                        <Status text="Inactive" />
                      )}
                    </td>
                    <td>{item.user_name}</td>
                    <td>{item.user_description}</td>
                    <td>
                      <ul className="table-action ">
                        {item.user_is_active ? (
                          <>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Edit"
                                onClick={() => handleEdit(item)}
                              >
                                <FilePenLine />
                              </button>
                            </li>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Archive"
                                onClick={() => handleArchive(item)}
                              >
                                <Archive />
                              </button>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Restore"
                                onClick={() => handleRestore(item)}
                              >
                                <ArchiveRestore />
                              </button>
                            </li>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Delete"
                                onClick={() => handleDelete(item)}
                              >
                                <Trash2 />
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* <LoadMore /> */}
        </div>
      </div>
      {store.isDelete && (
        <ModalDelete
          setIsDelete={setIsDelete}
          mysqlApiDelete={`/v2/user/${id}`}
          queryKey={"user"}
          item={dataItem.user_name}
        />
      )}
      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          mysqlEndpoint={`/v2/user/active/${id}`}
          queryKey={"user"}
        />
      )}

      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          mysqlEndpoint={`/v2/user/active/${id}`}
          queryKey={"user"}
        />
      )}
    </>
  );
};

export default UserList;
