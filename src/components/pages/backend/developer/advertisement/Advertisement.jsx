import { Plus } from 'lucide-react'
import React from 'react'

import Header from '../partials/Header'
import SearchBar from '../partials/Searchbar'
import Footer from '../partials/Footer'
import Table from './AdvertisementTable'
import { StoreContext } from '@/components/store/storeContext'
import { setIsAdd } from '@/components/store/storeAction'
import ModalAddAdvertisement from './ModalAddAdvertisement'
import ToastSuccess from '../partials/ToastSuccess'
import ModalError from '../partials/modals/ModalError'
import ModalValidation from '../partials/modals/ModalValidation'
import ModalAdd from './ModalAddAdvertisement'
import SideNavigation from '../partials/SideNavigation'




const  Advertisement = () => {
    const {dispatch, store} = React.useContext(StoreContext);
    const [itemEdit, setItemEdit] = React.useState(null);

    const handleAdd = () => {
      dispatch(setIsAdd(true));
      setItemEdit(null);
    }
  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="advertisement" />
          <main>
            <Header title="" subtitle="Manage s" />
            <div className="p-8">
              <div className="flex justify-between items-center">
               <div></div>
                <button className="btn btn-add" onClick={handleAdd}>
                  <Plus size={16} /> Add New
                </button>
              </div>
              <Table setItemEdit={setItemEdit} itemEdit={itemEdit} />
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
        <ModalAdd itemEdit={itemEdit}
         setItemEdit={setItemEdit} />
      )}
    </>
  );
}

export default Advertisement