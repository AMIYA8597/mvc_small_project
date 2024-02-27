import { lazy, useEffect, useMemo, useRef, useState } from 'react';

import Tooltip from '@mui/material/Tooltip';

const ChatBox = lazy(() => import('./components/chat-box'));
const AvatarWithUsername = lazy(() => import('./components/avatar-with-username'));

// function App() {
//   const [conversations, setConversations] = useState<Conversation[]>([]);

//   useEffect(() => {
//     setConversations(conversationData);
//   }, []);


// Define the Conversation interface
interface Conversation {
  converSationId: string;
  name: string;
  avatar: string;
  opened: boolean;
  messages: Message[];
}

interface Message {
  messageId: string;
  message: string;
}

function App() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    // Define your conversation data
    const conversationData: Conversation[] = [
      {
        converSationId: '1',
        name: 'Conversation 1',
        avatar: 'avatar1.jpg',
        opened: true,
        messages: [
          { messageId: '1', message: 'Hello!' },
          { messageId: '2', message: 'How are you?' }
        ]
      },
      {
        converSationId: '2',
        name: 'Conversation 2',
        avatar: 'avatar2.jpg',
        opened: true,
        messages: [
          { messageId: '3', message: 'Hi there!' },
          { messageId: '4', message: 'I\'m fine, thank you!' }
        ]
      }
    ];

    // Set the conversations state
    setConversations(conversationData);
  }, []);

  const conversationsOpened = useMemo(() => {
    return conversations.filter((c) => c.opened);
  }, [conversations]);

  const conversationsMinimize = useMemo(() => {
    return conversations.filter((c) => !c.opened);
  }, [conversations]);

  const onClose = (id: string) => {
    const newConversations = conversations.filter(
      (conversation) => conversation.converSationId !== id,
    );

    setConversations(newConversations);
  };

  const onMinimize = (id: string) => {
    const newConversations = conversations.map((conversation) => {
      if (conversation.converSationId === id) {
        conversation.opened = false;
      }

      return conversation;
    });

    setConversations(newConversations);
  };

  const openConversation = (id: string) => {
    let totalOpened = 0;

    const newConversations = conversations.map((conversation) => {
      if (totalOpened === 2) {
        conversation.opened = false;
      }

      if (conversation.opened) {
        totalOpened += 1;
      }

      if (conversation.converSationId === id) {
        conversation.opened = true;
      }

      return conversation;
    });

    setConversations(newConversations);
  };

  const onSubmit = (conversationId: string, message: string) => { 
    const newConversations = [...conversations].map((conversation) => {
      if (conversation.converSationId === conversationId) {
        conversation.messages.push({
          messageId: '999',
          message,
        });
      }

      return conversation;
    });

    setConversations(newConversations);
  }

  const onRemove = (conversationId: string, messageId: string) => {
    const newConversations = [...conversations].map((conversation) => {
      if (conversation.converSationId === conversationId) {
        conversation.messages = [...conversation.messages].filter(
          (message) => message.messageId !== messageId,
        );
      }

      return conversation;
    });

    setConversations(newConversations);
  };

  const onLoadPrevious = (conversationId: string) => {};

  return (
    <div className="fixed bottom-0 right-6 md:right-16">
      <div className="flex gap-3">
        {conversationsOpened.map((conversation) => {
          return (
            <ChatBox
              conversationId={conversation.converSationId}
              key={conversation.converSationId}
              title={conversation.name}
              avatar={conversation.avatar}
              conversations={conversation.messages}
              onClose={onClose}
              onMinimize={onMinimize}
              onSubmit={onSubmit}
              onLoadPrevious={onLoadPrevious}
              onRemove={onRemove}
            />
          );
        })}
      </div>
      <div className="fixed bottom-12 right-2">
        {conversationsMinimize.map((conversation) => {
          return (
            <Tooltip key={conversation.converSationId} title={conversation.name} followCursor>
              <div
                className="mt-2 hover:cursor-pointer"
                onClick={() => openConversation(conversation.converSationId)}
              >
                <AvatarWithUsername username={conversation.name} hiddenName={true} />
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}

export default App;



















// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <> 

//     </>
//   );
// }

// export default App;
















// "scripts": {
//   "start": "react-scripts start",
//   "build": "react-scripts build",
//   "test": "react-scripts test",
//   "eject": "react-scripts eject"
// },