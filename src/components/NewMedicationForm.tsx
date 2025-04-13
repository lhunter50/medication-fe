import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import { API_URL } from '../constants';
import { Medication } from '../models/Medication';

interface NewMedicationFormProps {
  resetState: () => void;
  toggle: () => void;
  medication?: Medication | null;
}

interface NewMedicationFormState {
  id: number | null;
  name: string;
  classification: string;
  implications: string;
  dose: string;
  route: string;
  frequency: string;
}

const NewMedicationForm = ({ medication, resetState, toggle } : NewMedicationFormProps) => {
    // State to handle form fields
    const [formData, setFormData] = useState<NewMedicationFormState>({
      id: null,
      name: '',
      classification: '',
      implications: '',
      dose: '',
      route: '',
      frequency: ''
    });

    // Initialize form data if editing a medication
    useEffect(() => {
      if (medication) {
        const { id, name, classification, implications, dose, route, frequency } = medication;
        setFormData({ id, name, classification, implications, dose, route, frequency });
      }
    }, [medication]);

    // Handle input change
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };

    // Create new medication (POST request)
    const createMedication = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      // Remove 'id' field if it exists in formData, since it's handled by Django
      const { id, ...dataToPost } = formData; // this will exclude the 'id' from the data
    
      axios
        .post(API_URL, dataToPost)
        .then(() => {
          resetState();
          toggle();
        })
        .catch(error => {
          console.error('Error during POST request', error);
        })
    };

    // Edit existing medication (PUT request)
      const editMedication = (e: FormEvent<HTMLFormElement>) => {
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
    const defaultIfEmpty = (value: string | undefined | null): string =>
      value === undefined || value === null ? '' : value;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
            id='name'
            type="text"
            name="name"
            onChange={onChange}
            value={defaultIfEmpty(formData.name)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="classification">Classification:</Label>
          <Input
            id='classification'
            type="text"
            name="classification"
            onChange={onChange}
            value={defaultIfEmpty(formData.classification)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="implications">Implications:</Label>
          <Input
            id='implications'
            type="text"
            name="implications"
            onChange={onChange}
            value={defaultIfEmpty(formData.implications)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="dose">Dose:</Label>
          <Input
            id='dose'
            type="text"
            name="dose"
            onChange={onChange}
            value={defaultIfEmpty(formData.dose)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="route">Route:</Label>
          <Input
            id='route'
            type="text"
            name="route"
            onChange={onChange}
            value={defaultIfEmpty(formData.route)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="frequency">Frequency:</Label>
          <Input
            id='frequency'
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
