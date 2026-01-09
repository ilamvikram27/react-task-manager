import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ConfirmDialog = ({ open, onClose, message }) => {
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>No</Button>
        <Button color="error" onClick={() => onClose(true)}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
