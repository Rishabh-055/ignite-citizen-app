import { Link } from 'react-router-dom';
import { Home, FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* App-like navigation buttons */}
        <div className="flex justify-center space-x-8 mb-4 md:hidden">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-primary-foreground hover:bg-primary-hover">
              <Home className="h-6 w-6" />
              <span className="text-xs">Home</span>
            </Button>
          </Link>
          <Link to="/report-issue">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-primary-foreground hover:bg-primary-hover">
              <FileText className="h-6 w-6" />
              <span className="text-xs">Report</span>
            </Button>
          </Link>
          <Link to="/ai-chat">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-primary-foreground hover:bg-primary-hover">
              <MessageSquare className="h-6 w-6" />
              <span className="text-xs">AI Chat</span>
            </Button>
          </Link>
        </div>

        {/* Footer content */}
        <div className="text-center">
          <p className="text-sm text-primary-foreground/80 mb-2">
            All rights reserved
          </p>
          <p className="text-sm font-medium">
            Made with love, by Spark Squad ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};