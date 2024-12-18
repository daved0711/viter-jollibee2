import { Plus } from "lucide-react";
import React from "react";
import SideNavigation from "../partials/SideNavigation";
import Header from "../partials/Header";
import SearchBar from "../partials/Searchbar";
import Footer from "../partials/Footer";
import { StoreContext } from "@/components/store/storeContext";
import { setIsAdd } from "@/components/store/storeAction";
import ToastSuccess from "../partials/ToastSuccess";
import ModalError from "../partials/modals/ModalError";
import ModalValidation from "../partials/modals/ModalValidation";
import ModalAddCategory from "./ModalAddCategory";
import CategoryTable from "./CategoryTable";

const Category = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [isCategoryEdit, setIsCategoryEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setIsCategoryEdit(null);
  };

  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="category" />
          <main>
            <Header title="Category" subtitle="Manage Kiosk Category" />
            <div className="p-8">
              <div className="flex justify-between items-center">
                <div></div>
                <button className="btn btn-add" onClick={handleAdd}>
                  <Plus size={16} /> Add New
                </button>
              </div>
              <CategoryTable
                isCategoryEdit={isCategoryEdit}
                setIsCategoryEdit={setIsCategoryEdit}
              />
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
        <ModalAddCategory
          isCategoryEdit={isCategoryEdit}
          setIsCategoryEdit={setIsCategoryEdit}
        />
      )}
    </>
  );
};

export default Category;
