import { useState, useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'reactstrap';
import MedicationList from './MedicationList';
import NewMedicationModal from './NewMedicationModal';
import axios from 'axios';
import { API_URL } from '../constants';

const Home = () => {
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState([])

    const getMedications = () => {
        setLoading(true);  // Start loading
        axios.get(API_URL)
            .then((res) => {
                setMedications(res.data);  // Set medication data
                setLoading(false);  // Stop loading
            })
            .catch((err) => {
                console.error('Failed to fetch meds', err);
                setLoading(false);  // Stop loading even if there's an error
            });
    };

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
                    {/* Create New Medication Modal */}
                    <NewMedicationModal create={true} resetState={resetState} medication={medications}/>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
