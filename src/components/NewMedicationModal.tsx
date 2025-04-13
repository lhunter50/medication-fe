import { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import NewMedicationForm from "./NewMedicationForm";
import { Medication } from "../models/Medication";

interface NewMedicationModalProps {
    medication?: Medication | null; //We aren't passing down an array of medications, just a single one.
    resetState: () => void;
    create: boolean;
}

const NewMedicationModal = ({ create, resetState, medication } : NewMedicationModalProps) => {
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
    }, [medication, create] );

    if(isLoading || (!create && !medication)) {
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