import { Archive, X } from 'lucide-react'
import React from 'react'
import ModalWrapper from './ModalWrapper'
import { StoreContext } from '@/components/store/storeContext'
import { setIsConfirm, setIsDelete, setMessage, setSuccess, setValidate } from '@/components/store/storeAction'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import SpinnerButton from '../spinners/SpinnerButton'
import { queryData } from '@/components/helpers/queryData'

const ModalConfirm = ({ mysqlApiArchive, queryKey, active }) => {
    const handleClose = () => {
      dispatch(setIsConfirm(false));
    }
    const { dispatch } = React.useContext(StoreContext);
    const queryClient = useQueryClient();
  
  
    const mutation = useMutation({
      mutationFn: (values) => queryData(mysqlApiArchive, "put", values),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
  
  
        if (!data.success) {
          dispatch(setValidate(true));
          dispatch(setMessage(data.error));
        } else {
          dispatch(setIsConfirm(false));
          dispatch(setSuccess(true));
          dispatch(setMessage(""));
        }
      },
    });
  
  
    const handleYes = async () => {
      mutation.mutate({
        isActive: active ? 1 : 0,
      });
    };
  

  return (
    <>
        <ModalWrapper>

        

            <div className="modal-main bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] w-full rounded-md border border-line">

                <div className="modal-header flex gap-2 p-2 items-center border-b border-light mb-2">
                    <Archive size={16} stroke='yellow'/> <span className='text-warning'>Archive</span>
                    <button className="ml-auto" onClick={handleClose}><X/></button>
                </div>

                <div className="modal-body p-2 py-4">
                    <p className="mb-0 text-center">Are you sure you want to {active ? "restore" : "archive"} this recipe?</p>

                    <div className='flex justify-end gap-3 mt-5 text-[14px]'>

                        <button 
                        className='btn btn-warning' 
                        type='submit'
                        onClick={handleYes}>
                          {mutation.isPending && <SpinnerButton/>}
                          {active ? "Restore" : "Archive"}
                        </button>

                        <button 
                        className='btn btn-cancel' 
                        type='reset' 
                        onClick={handleClose}>Cancel
                        </button>

                    </div>

                </div>

            </div>


            </ModalWrapper>
    </>
  )
}

export default ModalConfirm