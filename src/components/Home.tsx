import { useState, useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'reactstrap';
import MedicationList from './MedicationList';
import NewMedicationModal from './NewMedicationModal';
import axios from 'axios';
import { API_URL } from '../constants';
import React from 'react';

// Defining the Medication type based on my data structure.
interface Medication {
    id: number;
    name: string;
    classification: string;
    intention: string;
    implications: string;
    dose: string;
    route: string;
    frequency: string;
    [key:string]: any;
}   

const Home = () => {

    // Set state for our medication, using our Medication type
    const [medications, setMedications ] = useState<Medication[]>([])

    // Set state for loading using boolean type, we set it to false originally and update the state when we are actually loading.
    const [loading, setLoading] = useState<boolean>(false)

    const getMedications = () => {
        setLoading(true);
        axios.get<Medication[]>(API_URL) // We are telling the response to expect an array of our Medication objects!
        .then((res) => {
            setMedications(res.data) // update the state of medications with all of our Medication objects
            setLoading(false) // change the state back to false because we are done loading.
        })
        .catch((err) => {
            console.error('Failed to fetch medication', err)
            setLoading(false)
        })
    }

    const resetState = () => {
        getMedications();
    };

    useEffect(() => {
        getMedications();
    }, []);

    if(loading) {
        return (
            <Container className='text-center' style={{marginTop: '20%' }}>
                <Spinner animation='border' role='status' />
                <div>Loading Medications...</div>
            </Container>
        )
    }

    return (
        <Container>
            <Row>
                <Col>
                    <MedicationList medications={medications} resetState={resetState} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <NewMedicationModal create={true} resetState={resetState} medication={medications}/>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
