import { lazy, useState } from 'react';

import Send from '@mui/icons-material/Send';
import { InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';

const ChatBoxFooter = ({ onSubmit }: { onSubmit: (message: string) => void }) => {
  const [message, setMessage] = useState('');

  const summitMessage = () => {
    if (!message) {
      return;
    }

    setMessage('');
    onSubmit(message);
  };

  return (
    <TextField
      placeholder="Message here ... "
      className="w-full"
      style={{ borderRadius: 999 }}
      value={message}
      onChange={(event) => {
        setMessage(event.target.value);
      }}
      onKeyDown={(event) => {
        if (event.keyCode === 13) {
          summitMessage();
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" className="hover:cursor-pointer hover:text-blue-500">
            <Send onClick={summitMessage} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ChatBoxFooter;