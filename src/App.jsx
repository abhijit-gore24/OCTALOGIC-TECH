
import './App.css'
import FormContainer from './component/form_container'
import { FormProvider } from './context/vehicle_context'
// Import default styles


const App = () => (
  <FormProvider>
    <FormContainer />
  </FormProvider>
);


export default App
