



// FormContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedWheels, setSelectedWheels] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [vehicleModels, setVehicleModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
 
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
 
  const baseUrl=import.meta.env.VITE_BASE_URL;
 

  // useEffect(() => {
    const fetchVehicleTypes = async (category) => {
      setLoading(true);
      try {
       
        const response = await axios.get(`${baseUrl}/api/vehicleType/${category}`); // Replace with your actual API endpoint
     
        setVehicleTypes(response.data.vehicleTypes);
      } catch (error) {
        console.error('Error fetching vehicle types:', error);
      }
      finally {
        setLoading(false);
      }
    };
    const fetchVehicleModels = async (typeId) => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/vehicles/${typeId}`); // Replace with your actual API endpoint
     
        setVehicleModels(response.data.vehicles);
      } catch (error) {
        console.error('Error fetching vehicle models:', error);
      }
      finally {
        setLoading(false);
      }
    };
    const submitFormData = async (formData) => {
      setLoading(true);
      try {
        const response = await axios.post(`${baseUrl}/api/bookings`, formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        
        // Optionally, handle any success actions or state updates here
      } catch (error) {
        if (error.response) {
          // Check for specific error code or message
          if (error.response.status === 400 ) {
            throw new Error('Cannot book on the same date. Please choose a different date.');
          } else {
            throw new Error('Failed to submit booking. Please try again.');
          }
        } else {
          throw new Error('An unexpected error occurred. Please try again later.');
        }
      }
      finally {
        setLoading(false);
      }
    };

  return (
    <FormContext.Provider
      value={{
        firstName,
        lastName,
        selectedWheels,
        vehicleTypes,
        selectedType,
        step,
        vehicleModels,
        selectedModel,
        startDate,
        endDate,
        loading,
        setFirstName,
        setLastName,
        setSelectedWheels,
        setSelectedType,
        setVehicleModels,
        setSelectedModel,
        setStep,
        setStartDate,
        setEndDate,
        fetchVehicleTypes,
        fetchVehicleModels,
        submitFormData
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
