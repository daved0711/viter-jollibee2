import React from "react";

import useQueryData from "@/components/custom-hook/useQueryData";
import { setError, setIsAdd, setMessage } from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";
import { Plus } from "lucide-react";
import Footer from "../../partials/Footer";
import Header from "../../partials/Header";
import ModalError from "../../partials/modals/ModalError";

import ToastSuccess from "../../partials/ToastSuccess";
import DeveloperList from "./DeveloperList";
import ModalAddDeveloper from "./ModalAddDeveloper";
import SideNavigation from "../../partials/SideNavigation";



const Developer = () => {
  const [itemEdit, setItemEdit] = React.useState(null);
  const { dispatch, store } = React.useContext(StoreContext);

  const { isFetching, data: role } = useQueryData(
    `/v2/role`, //endpoint
    "get", //method
    "role" //key
  );

  const developerRole = role?.data.filter(
    (item) => item.role_is_developer == 1
  );

  const handleAdd = () => {
    if (developerRole?.lenght === 0) {
      dispatch(setError(true));
      dispatch(setMessage("Developer role is required"));
      return;
    }
    setItemEdit(null);
    dispatch(setIsAdd(true));
  };
  console.log(developerRole);
  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="developer" />
          <main>
            <Header title="Developer" subtitle="Welcome to Jollibee" />
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div></div>

                {isFetching ? (
                  "Loading..."
                ) : (
                  <button
                    className="btn btn-add"
                    type="button"
                    onClick={handleAdd}
                  >
                    <Plus size={16} /> Add New
                  </button>
                )}
              
              </div>
              <DeveloperList setItemEdit={setItemEdit} />
            </div>

            <Footer />
          </main>
        </div>
      </section>
      {store.isAdd && <ModalAddDeveloper itemEdit={itemEdit} developerRole={developerRole} />}
      {store.success && <ToastSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Developer;
