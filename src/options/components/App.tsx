import { Alert, Box, Button, Snackbar } from '@mui/material';
import { loadSelectorSetsAsString, saveSelectorSetsAsString } from 'common/lib/Config';
import React, { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';


export function App() {
  const [value, setValue] = useState<string>('');
  const [initialValueFetched, setInitialValueFetched] = useState<boolean>(false);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  useEffect(() => {
    loadSelectorSetsAsString().then((value) => {
      setValue(value);
      setInitialValueFetched(true);
    });
  }, []);

  if (initialValueFetched == null) {
    return <></>
  }

  const doSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveSelectorSetsAsString(value);
    setNotificationOpen(true);
  };

  const notificationHandleClose = () => {
    setNotificationOpen(false);
  }

  return (
    <form style={{ height: '100%' }} onSubmit={doSubmit}>
      <div style={{ height: '85%', marginBottom: '10px' }}>
          <EditorPresenter value={value} setValue={setValue} />
      </div>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" type="submit" >Save</Button>
      </Box>
      <Snackbar
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={notificationHandleClose}
      >
        <Alert onClose={notificationHandleClose} severity="success" sx={{ width: '100%' }}>
          Saved
        </Alert>
      </Snackbar>
    </form>
  );
}

function EditorPresenter({ value, setValue }: { value: string, setValue: (v: string) => void }) {
  return (
    <MonacoEditor
      language="json"
      value={value}
      onChange={setValue}
      options={{
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
}