import { useContext, useEffect, useState } from "react";
import FormNavigation from "./form_navigation";
import NameInput from "./name_input";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import WheelsRadio from "./wheel_radio";
import VehicleTypeRadio from "./vehicle_type";
import { FormContext } from "../context/vehicle_context";
import VehicleModelRadio from "./vehicle_model";
import BasicDateRangePicker from "./date_range";
import DateRangePickerValue from "./date_range";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';



const FormContainer = () => {
    const {
        firstName,
        lastName,
        selectedWheels,
        vehicleTypes,
        selectedType,
        vehicleModels,
        selectedModel,
        startDate,
        endDate,
        loading,
        step,
        setFirstName,
        setLastName,
        setSelectedWheels,
        setSelectedType,
        setSelectedModel,
        setStartDate,
        setEndDate,
        setStep,
        fetchVehicleModels,
        fetchVehicleTypes,
        submitFormData
    } = useContext(FormContext);
  
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11)
    });
    const [alert, setAlert] = useState({ open: false, severity: '', message: '' });
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (alert.open) {
            const timer = setTimeout(() => {
                setAlert({ ...alert, open: false });
            }, 3000); // 3 seconds

            return () => clearTimeout(timer); // Cleanup on unmount or alert change
        }
    }, [alert]);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleSelectWheels = async (value) => {
        setSelectedWheels(value);
    };


    const handleSelectType = async (id) => {
        setSelectedType(id);

    };

    const handleSelectModel = (id) => {
        setSelectedModel(id);
    };
    const handleDateRangeChange = (newRange) => {
        // setDateRange(newRange);
        setDateRange({
            startDate: newRange[0],
            endDate: newRange[1]
        });
    };

    const handleNext = async () => {
        if (step === 1 && firstName && lastName) {
            setStep(step + 1);

        }
        else if (step === 2 && selectedWheels) {
            setStep(step + 1);
            await fetchVehicleTypes(selectedWheels);
        }
        else if (step === 3 && selectedType) {
            setStep(step + 1);
            await fetchVehicleModels(selectedType);

        }
        else if (step === 4 && selectedModel) {

            setStep(step + 1);
        }
        else if (step === 5 && dateRange.startDate && dateRange.endDate) {
            const formData = {
                firstName,
                lastName,
                vehicleId: selectedModel,
                startDate: dateRange.startDate.toISOString(), // Convert to ISO string
                endDate: dateRange.endDate.toISOString()
            };
            try {
                await submitFormData(formData);
                setAlert({ open: true, severity: 'success', message: 'Booking is successful!' });
                setStep(1); // Reset form 
            } catch (error) {

                setAlert({ open: true, severity: 'error', message: 'The vehicle is already reserved for this date. Please select a different date.' });
            }


        }
        else {
            setAlert({ open: true, severity: 'error', message: 'Please complete the current step before proceeding.' });

        }
    }
    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };


    const renderStepContent = () => {
        if (loading) {
            return <CircularProgress />;
        }
        switch (step) {
            case 1:
                return <NameInput firstName={firstName} lastName={lastName} onFirstNameChange={handleFirstNameChange} onLastNameChange={handleLastNameChange} />;
            case 2:
                return <WheelsRadio selectedWheels={selectedWheels} onSelectWheels={handleSelectWheels} />;
            case 3:
                return <VehicleTypeRadio vehicleTypes={vehicleTypes} selectedType={selectedType} onSelectType={handleSelectType} />;

            case 4:
                return <VehicleModelRadio vehicleModels={vehicleModels} selectedModel={selectedModel} onSelectModel={handleSelectModel} />;
            case 5:
                return <DateRangePickerValue value={dateRange} onChange={handleDateRangeChange} />
           
            default:
                return null;
        }
    };

    return (

        
        <Box
        width={isSmallScreen ? '100%' : 400} 
        // width={500}
        p={5}
            bgcolor="#f0f0f0"
            borderRadius={2}
            boxShadow={3}
            // display="grid"
            display="flex"
            flexDirection="column"

            alignItems="center"
            justifyContent="center"
            m="auto"
            mt={5}

        >
            {alert.open && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="filled" severity={alert.severity}>
                        {alert.message}
                    </Alert>
                </Stack>
            )}
            <h1 mb={4}>Booking Form - Step {step}</h1>
            {renderStepContent()}
            <FormNavigation onNext={handleNext} onBack={handleBack} step={step} />
        </Box>
    )

}
export default FormContainer
