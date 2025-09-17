import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function AIChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. I can help you with reporting issues, checking status, or answering questions about community services. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('report') || input.includes('issue') || input.includes('problem')) {
      return "I can help you report an issue! You can describe the problem here, or would you like me to guide you to the report form where you can add photos and location details?";
    }
    
    if (input.includes('status') || input.includes('check') || input.includes('update')) {
      return "To check the status of your reports, you can visit the Dashboard where you'll see all your submitted issues and their current status. Would you like me to help you navigate there?";
    }
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! I'm here to help you with any questions about community issues, reporting problems, or checking the status of your submissions. What would you like to know?";
    }
    
    if (input.includes('help') || input.includes('how')) {
      return "I can help you with:\n• Reporting new issues\n• Checking report status\n• Understanding the process\n• Navigating the app\n\nWhat specific help do you need?";
    }
    
    if (input.includes('thank')) {
      return "You're welcome! I'm always here to help make your community better. Is there anything else you'd like to know?";
    }
    
    return "I understand you're asking about that. Let me help you find the right information or guide you to the appropriate section of the app. Could you provide a bit more detail about what you need help with?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <Bot className="h-8 w-8" />
          <div>
            <h1 className="text-lg font-semibold">AI Assistant</h1>
            <p className="text-sm text-primary-foreground/80">Online • Ready to help</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="text-primary-foreground hover:bg-primary-hover"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-start space-x-2 max-w-xs md:max-w-md ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <Card
                className={`${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card'
                }`}
              >
                <CardContent className="p-3">
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user'
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <Card className="bg-card">
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-background p-4">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}