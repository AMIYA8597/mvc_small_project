import { lazy } from 'react';

import Close from '@mui/icons-material/Close';
import Remove from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';

const AvatarWithUsername = lazy(() => import('./avatar-with-username'));

const ChatBoxHeader = ({
  title,
  onClose,
  onMinimize,
}: {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
}) => {
  return (
    <div className="flex justify-between w-full bg-blue-950 text-white p-2">
      <AvatarWithUsername username={title} subTitle={'Đnag hoạt động'} />
      <div className="flex mr-3">
        <IconButton onClick={onMinimize}>
          <Remove className="text-white" />
        </IconButton>
        <IconButton onClick={onClose}>
          <Close className="text-white" />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatBoxHeader;