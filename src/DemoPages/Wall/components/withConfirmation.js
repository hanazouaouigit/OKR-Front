import React, { useState } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';

const withConfirmation = Component => props => {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({ title: "", subTitle: "" })
    const [callBack, setCallback] = useState(null);


    /* function closeModal() {
         setOpen(false);
     } */
    function onConfirm() {
        callBack();
        setOpen(false);
    }
    function showModal({ title, subTitle, confirmFunction }) {
        setOpen(true);
        setState({
            title,
            subTitle
        })
        setCallback(() => confirmFunction);

    }
    return (
        <React.Fragment>
            <Component {...props} showConfirmModal={showModal} />

            <SweetAlert title={state?.title}
                warning
                show={open}
                showCancel
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="default"
                confirmBtnText={"Ok"}
                cancelBtnText={"No"}
                onConfirm={() => {
                    onConfirm();
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            >
                {state?.subTitle}
            </SweetAlert>

        </React.Fragment>
    );
};
export default withConfirmation;