import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import { API_URL } from '../constants';

const NewMedicationForm = ({ medication, resetState, toggle }) => {
    // State to handle form fields
    const [formData, setFormData] = useState({
      id: undefined,
      name: '',
      classification: '',
      implications: '',
      dose: '',
      route: '',
      frequency: ''
    });

    // Initialize form data if editing a medication
    useEffect(() => {
      if (medication && Object.keys(medication).length > 0) {
        const { id, name, classification, implications, dose, route, frequency } = medication;
        setFormData({ id, name, classification, implications, dose, route, frequency });
      }
    }, [medication]);

    // Handle input change
    const onChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };

    // Create new medication (POST request)
    const createMedication = (e) => {
      e.preventDefault();
    
      // Remove 'id' field if it exists in formData, since it's handled by Django
      const { id, ...dataToPost } = formData; // this will exclude the 'id' from the data
    
      axios
        .post(API_URL, dataToPost)
        .then(() => {
          resetState();
          toggle();
        })
    };

    // Edit existing medication (PUT request)
      const editMedication = (e) => {
              e.preventDefault();

              // Ensure `id` exists before proceeding with the PUT request
              if (!formData.id) {
                  console.error("Medication id is undefined or missing");
                  return;
              }

        // Send the PUT request with `id` (for updating an existing medication)
        axios.put(API_URL + formData.id + '/', formData)
            .then(() => {
                resetState();
                toggle();
            })
            .catch(error => {
                console.error("Error during PUT request: ", error);
            });
    };

    // Helper function to handle empty values
    const defaultIfEmpty = (value) => (value === undefined || value === null ? '' : value);

    const handleSubmit = (e) => {
      // If there's an id, it means we're editing an existing medication
      if (formData.id) {
          editMedication(e);
      } else {
          createMedication(e);  // Otherwise, we are creating a new medication
      }
    };

    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={onChange}
            value={defaultIfEmpty(formData.name)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="classification">Classification:</Label>
          <Input
            type="text"
            name="classification"
            onChange={onChange}
            value={defaultIfEmpty(formData.classification)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="implications">Implications:</Label>
          <Input
            type="text"
            name="implications"
            onChange={onChange}
            value={defaultIfEmpty(formData.implications)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="dose">Dose:</Label>
          <Input
            type="text"
            name="dose"
            onChange={onChange}
            value={defaultIfEmpty(formData.dose)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="route">Route:</Label>
          <Input
            type="text"
            name="route"
            onChange={onChange}
            value={defaultIfEmpty(formData.route)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="frequency">Frequency:</Label>
          <Input
            type="text"
            name="frequency"
            onChange={onChange}
            value={defaultIfEmpty(formData.frequency)}
          />
        </FormGroup>

        <Button>Send</Button>
      </Form>
    );
};

export default NewMedicationForm;
