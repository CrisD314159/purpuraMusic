'use client'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useSWR from 'swr';
import { GetCountries } from '@/app/lib/actions/requests/getRequests';
import { useState } from 'react';

interface Country {
  id: number
  name: string
}

interface CountrySelectProps {
  setCountry : (int: number) => void
}

export default function CountrySelect({setCountry}: CountrySelectProps) {
  const [country, setCountryValue] = useState('');
  const {data, error, isLoading} = useSWR('countries', GetCountries)


  const handleChange = (event: SelectChangeEvent) => {
    setCountryValue(event.target.value as string);
    setCountry(parseInt(event.target.value as string))
  };

  console.log(error);
  return (
    <Box sx={{ width: 300, marginBottom: '2rem' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="Country"
          onChange={handleChange}
        >
          {isLoading && <MenuItem>Loading...</MenuItem>}
          {error && <MenuItem>Error Loading...</MenuItem>}
          {data && data.map((country: Country) => <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}
