// import * as React from 'react';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers';

// export const BasicDateRangePicker = ({ value, onChange }) => {
//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DateRangePicker
//                 startText="Start"
//                 endText="End"
//                 value={value}
//                 onChange={(newValue) => onChange(newValue)}
//                 renderInput={(startProps, endProps) => (
//                     <>
//                         <TextField {...startProps} />
//                         <Box sx={{ mx: 2 }}> to </Box>
//                         <TextField {...endProps} />
//                     </>
//                 )}
//             />
//         </LocalizationProvider>
//     );
// };
import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export default function DateRangePickerValue({ value, onChange }) {
//   const [value, setValue] = React.useState([
//     dayjs('2022-04-17'),
//     dayjs('2022-04-21'),
//   ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
        {/* <DemoItem label="Uncontrolled picker" component="DateRangePicker">
          <DateRangePicker
            defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
          />
        </DemoItem> */}
        <DemoItem label="Select Booking Date" component="DateRangePicker">
          <DateRangePicker
            value={value}
            onChange={onChange} 
            // onChange={(newValue) => setValue(newValue)}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

