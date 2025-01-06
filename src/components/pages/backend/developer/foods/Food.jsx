import { Plus } from "lucide-react";
import React from "react";

import { setIsAdd } from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";

import Footer from "../partials/Footer";
import Header from "../partials/Header";
import ToastSuccess from "../partials/ToastSuccess";
import ModalError from "../partials/modals/ModalError";
import ModalValidation from "../partials/modals/ModalValidation";
import FoodTable from "./FoodTable";
import ModalAddFood from "./ModalAddFood";
import SideNavigation from "../partials/SideNavigation";


const Food = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="foods" />
          <main>
            <Header title="Food" subtitle="Manage Foods" />
            <div className="p-8">
              <div className="flex justify-between items-center">
                <div></div>
                <button className="btn btn-add" onClick={handleAdd}>
                  <Plus size={16} /> Add New
                </button>
              </div>
              <FoodTable setItemEdit={setItemEdit} itemEdit={itemEdit} />
            </div>
            <Footer />
          </main>
        </div>
      </section>
      {store.validate && <ModalValidation />}
      {store.error && <ModalError />}
      {store.success && <ToastSuccess />}
      {/* <SpinnerWindow/> */}
      {store.isAdd && (
        <ModalAddFood itemEdit={itemEdit}
         setItemEdit={setItemEdit} />
      )}
    </>
  );
};

export default Food;
