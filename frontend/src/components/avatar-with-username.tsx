import React, { useEffect, useState } from 'react';
import Avatar, { AvatarProps } from '@mui/material/Avatar';

export interface AvatarWithUsernameProps extends AvatarProps {
  username: string;
  subTitle?: string;
  hiddenName?: boolean;
}

const AvatarWithUsername: React.FC<AvatarWithUsernameProps> = ({
  username,
  subTitle,
  hiddenName = false,
  ...props
}) => {
  const [title, setTitle] = useState('');
  const [secondaryTitle, setSecondaryTitle] = useState('');

  useEffect(() => {
    setTitle(username);
  }, [username]);

  useEffect(() => {
    setSecondaryTitle(subTitle ?? '');
  }, [subTitle]);

  return (
    <div className="flex">
      <Avatar {...props} />
      {!hiddenName && (
        <div className="ml-2 grid items-center">
          <span className="text-base font-bold">{title}</span>
          <span className="text-sm text-stone-500">{secondaryTitle}</span>
        </div>
      )}
    </div>
  );
};

export default AvatarWithUsername;
