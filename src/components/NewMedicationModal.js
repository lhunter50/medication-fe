import { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import NewMedicationForm from "./NewMedicationForm";

const NewMedicationModal = ({ create, resetState, medication }) => {
    // useState to manage modal open/close state
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    // Toggle function to open/close modal
    const toggle = () => setModal(prevModal => !prevModal);

    const title = create ? 'Creating New Medication' : 'Editing Medication';

    const button = create ? (
        <Button
            color="primary"
            className="float-right"
            onClick={toggle}
            style={{ minWidth: '200px'}}
        >
            Create New
        </Button>
    )  : (
        <Button onClick={toggle}>Edit</Button>
    )

    useEffect(() => {
        if (medication !== null) {
            setIsLoading(false)
        }
        console.log('Medication prop:', medication);
    }, [medication] );

    // Handle case when medication is null (for creating new medication)
    const medicationData = medication || [];

    if(isLoading || !medication) {
        return <div>Loading...</div>
    }

    return (
        <>
            {button}
            <Modal isOpen={modal} title={title} >
                <ModalHeader >{title}</ModalHeader>
                <ModalBody>
                    <NewMedicationForm
                        resetState={resetState}
                        toggle={toggle}
                        medication={medication} // Pass medicationData, default to empty object if null
                    />
                    <Button onClick={toggle}>Close</Button>
                </ModalBody>
            </Modal>
        </>
    );
};

export default NewMedicationModal