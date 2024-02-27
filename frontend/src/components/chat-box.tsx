import { lazy, useEffect, useRef } from 'react';

import Card from '@mui/material/Card';

const ChatBoxHeader = lazy(() => import('./chat-box-header'));
const ChatBoxFooter = lazy(() => import('./chat-box-footer'));
const ChatBoxMessage = lazy(() => import('./chat-box-message'));

export interface ChatBoxProps {
  conversationId: string;
  title: string;
  avatar: string;
  conversations: { messageId: string; message: string; author?: string; avatar?: string }[];
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onSubmit: (id: string, message: string) => void;
  onLoadPrevious: (id: string) => void;
  onRemove: (conversationId: string, messageId: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  avatar,
  conversations,
  conversationId,
  onClose,
  onMinimize,
  onSubmit,
  onLoadPrevious,
  onRemove,
  title,
}) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();

    const conversation = document.getElementById(`conversation-${conversationId}`);

    conversation?.addEventListener('scroll', (e: any) => {
      const el = e.target;

      if (el.scrollTop === 0) {
        onLoadPrevious(conversationId);
      }
    });
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onSubmitMessage = (message: string) => {
    onSubmit(conversationId, message);
    scrollToBottom();
  };

  return (
    <Card variant="outlined" className="w-80 md:w-96" sx={{ borderRadius: 5 }}>
      <ChatBoxHeader
        title={title}
        onClose={() => onClose(conversationId)}
        onMinimize={() => onMinimize(conversationId)}
      />
      <div className="p-2 h-96 overflow-auto" id={`conversation-${conversationId}`}>
        {conversations.map((conversation) => {
          return (
            <ChatBoxMessage
              key={conversation.messageId}
              messageId={conversation.messageId}
              message={conversation.message}
              author={conversation.author}
              avatar={conversation.avatar}
              onRemove={(messageId: string) => onRemove(conversationId, messageId)}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <ChatBoxFooter onSubmit={onSubmitMessage} />
    </Card>
  );
};

export default ChatBox;