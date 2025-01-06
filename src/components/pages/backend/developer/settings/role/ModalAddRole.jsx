import useQueryData from "@/components/custom-hook/useQueryData";
import useUploadPhoto from "@/components/custom-hook/useUploadPhoto";
import { InputText, InputTextArea } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { X } from "lucide-react";
import React from "react";
import * as Yup from "Yup";
import ModalWrapper from "../../partials/modals/ModalWrapper";
import SpinnerButton from "../../partials/spinners/SpinnerButton";

const ModalAddRole = ({ itemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);

  const handleClose = () => {
    if (mutation.isPending) return;
    dispatch(setIsAdd(false));
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit ? `/v2/role/${itemEdit.role_aid}` : "/v2/role",
        itemEdit ? "PUT" : "POST",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["role"] });

      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        dispatch(setSuccess(false));
      } else {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage("Successful!"));
      }
    },
  });

  const initVal = {
    role_name: itemEdit ? itemEdit.role_name : "",
    role_description: itemEdit ? itemEdit.role_description : "",
    role_name_old: itemEdit ? itemEdit.role_name : "",
  };
  const yupSchema = Yup.object({
    role_name: Yup.string()
      .required("Required")
      .matches(/^[A-Za-z]+$/, "Invalid Name"),
    role_description: Yup.string().required("Required"),
  });
  return (
    <>
      <ModalWrapper>
        <div className="modal-side absolute top-0 right-0 bg-primary h-[100dvh] w-[300px] border-l border-line">
          <div className="modal-header p-4 flex justify-between items-center">
            <h5 className="mb-0">Add Roles</h5>
            <button onClick={handleClose}>
              <X />
            </button>
          </div>

          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values) => {
              mutation.mutate({
                ...values,
              });
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal-form h-[calc(100vh-56px)] grid grid-rows-[1fr_auto]">
                    <div className="form-wrapper p-4 max-h-[85vh] overflow-y-auto custom-scroll">
                      <div className="input-wrap">
                        <InputText
                          label="Role Name"
                          type="text"
                          name="role_name"
                        />
                      </div>

                      <div className="input-wrap">
                        <InputTextArea
                          label="Role Description"
                          type="text"
                          name="role_description"
                        />
                      </div>
                      <div className="form-action flex p-4 justify-end gap-3">
                        <button className="btn btn-accent" type="submit">
                          {mutation.isPending ? <SpinnerButton /> : "Save"}
                        </button>
                        <button
                          className="btn btn-cancel"
                          type="reset"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ModalAddRole;
