import React, { createContext, useContext, useState, useCallback } from 'react';
import { Alert, Snackbar } from '@mui/material';

const MessageCtx = createContext();

export function MessageProvider({ children }) {
  const [queue, setQueue] = useState([]);

  const push = useCallback(
    payload => setQueue(q => [...q, { key: Date.now(), ...payload }]),
    []
  );

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setQueue(q => q.slice(1));
  };

  const current = queue[0];

  return (
    <MessageCtx.Provider value={{ push }}>
      {children}
      {current && (
        <Snackbar
          key={current.key}
          open
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleClose}
            severity={current.severity || 'info'}
            sx={{ width: '100%' }}
          >
            {current.text}
          </Alert>
        </Snackbar>
      )}
    </MessageCtx.Provider>
  );
}

export const useMessage = () => useContext(MessageCtx);
