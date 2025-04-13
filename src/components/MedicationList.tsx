import { Table } from 'reactstrap';
import NewMedicationModal from './NewMedicationModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import {Medication} from '../models/Medication'
import React from 'react';

// We are typing what the component expects for props. We pass down from parent component.
interface MedicationListProps {
    medications: Medication[];
    resetState: () => void;
}

// We changed from a const to function, we don't want to use React.FC, we also don't want to have to call return type JSX.Element.
function MedicationList({ medications, resetState }: MedicationListProps) {
return (
    <Table dark>
        <thead>
            <tr>
                <th>Name</th>
                <th>Classification</th>
                <th>Intention</th>
                <th>Implications</th>
                <th>Dose</th>
                <th>Route</th>
                <th>Frequency</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {!medications || medications.length <= 0 ? (
                <tr>
                    <td colSpan={8} align="center">
                        <b>Oops, no medication here yet</b>
                    </td>
                </tr>
            ) : (
                medications.map(medication => (
                    <tr key={medication.id}>
                        <td>{medication.name}</td>
                        <td>{medication.classification}</td>
                        <td>{medication.intention}</td>
                        <td>{medication.implications}</td>
                        <td>{medication.dose}</td>
                        <td>{medication.route}</td>
                        <td>{medication.frequency}</td>
                        <td align="center">
                            <NewMedicationModal
                                create={false}
                                medication={medication}
                                resetState={resetState}
                            />
                            <ConfirmDeleteModal 
                                id={medication.id}
                                name={medication.name}
                                resetState={resetState}
                            />

                        </td>
                    </tr>
                ))
            )}
        </tbody>
    </Table>
);
};

export default MedicationList;
