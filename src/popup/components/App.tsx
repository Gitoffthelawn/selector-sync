import React, { useEffect, useState } from 'react';
import { SelectorResult } from './SelectorResult';
import { useSelectInTab  } from '../hooks/useSelectInTab';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectorSet } from 'common/types';
import { loadSelectedIndex, loadSelectorSetsAsString, saveSelectedIndex } from 'common/lib/Config';
import Alert from '@mui/material/Alert';

export function App() {
  const [selectorSets, setSelectorSets] = useState<SelectorSet[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadSelectorSetsAsString().then((json) => {
      console.log(json);
      setSelectorSets(JSON.parse(json));
    }).catch((reason) => {
      console.error(reason);
      setErrorMessage(reason.toString());
    })
  }, []);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const activeSelectorSpecifications = (selectorSets ?? [])[selectedIndex];
  const selectResults = useSelectInTab(activeSelectorSpecifications?.selectorSpecifications ?? []);

  useEffect(() => {
    loadSelectedIndex().then(setSelectedIndex);
  }, [])

  if (errorMessage != null) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  if (selectorSets == null) {
    return <>Loading...</>;
  }

  const handleSetSelectionChange = (e: SelectChangeEvent) => {
    const index = parseInt(e.target.value);
    setSelectedIndex(index);
    saveSelectedIndex(index);
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Selector Set</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedIndex.toString()}
        label="Selector Sets"
        size="small"
        sx={{ mb: 1 }}
        onChange={handleSetSelectionChange}
      >
        {
          selectorSets.map((set, i) => (
            <MenuItem value={i} key={i}>{set.title}</MenuItem>
          ))
        }
      </Select>
      {
        selectResults.map((result) => (
          <SelectorResult {...result} />
        ))
      }
    </FormControl>
  );
}