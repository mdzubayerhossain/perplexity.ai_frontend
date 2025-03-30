import React, { useState } from 'react';
import { Search, Home, Globe2, Box, Library, Download, Settings, HelpCircle, ArrowUpRight, Sparkles, Menu, X } from 'lucide-react';
import Discover from './components/Discover';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderMainContent = () => {
    if (activeSection === 'discover') {
      return <Discover />;
    }

    return (
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-8 mt-8 lg:mt-0">
          What do you want to know?
        </h1>

        {/* Search Bar */}
        <div className="relative">
          <div className="flex items-center bg-[#2D2E32] rounded-xl border border-gray-700 focus-within:border-[#00A3FF] focus-within:ring-1 focus-within:ring-[#00A3FF]">
            <textarea
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask anything..."
              className="w-full bg-transparent py-3 px-4 text-white placeholder-gray-500 focus:outline-none resize-none h-[52px]"
              rows={1}
            />
            <div className="flex items-center px-2 md:px-3 space-x-1 md:space-x-2">
              <button className="p-1 hover:bg-gray-700 rounded hidden sm:block">
                <Globe2 className="h-5 w-5 text-gray-400" />
              </button>
              <button className="bg-[#00A3FF] text-white px-2 md:px-3 py-1 rounded-lg hover:bg-[#0082CC] text-sm md:text-base">
                Ask
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#1A1B1E] text-white">
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleMobileMenu} 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 hover:bg-[#2D2E32] rounded-lg"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-gray-300" />
        ) : (
          <Menu className="h-6 w-6 text-gray-300" />
        )}
      </button>

      {/* Sidebar - Desktop & Mobile */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 transform 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-200 ease-in-out
        bg-[#1A1B1E] border-r border-gray-800 flex flex-col
      `}>
        <div className="p-4">
          <div className="flex items-center mb-6">
            <Sparkles className="h-6 w-6 text-[#00A3FF]" />
            <span className="ml-2 text-lg font-semibold">perplexity</span>
          </div>
          
          <button className="w-full bg-[#2D2E32] text-sm text-gray-300 px-4 py-2 rounded-lg mb-6 flex items-center justify-between">
            <span>New Thread</span>
            <span className="text-xs text-gray-500 hidden sm:inline">Ctrl ⌘ P</span>
          </button>

          <nav className="space-y-1">
            <button 
              onClick={() => setActiveSection('home')}
              className={`w-full flex items-center text-gray-300 hover:bg-[#2D2E32] px-3 py-2 rounded-lg ${activeSection === 'home' ? 'bg-[#2D2E32]' : ''}`}
            >
              <Home className="h-4 w-4 mr-3" />
              Home
            </button>
            <button 
              onClick={() => setActiveSection('discover')}
              className={`w-full flex items-center text-gray-300 hover:bg-[#2D2E32] px-3 py-2 rounded-lg ${activeSection === 'discover' ? 'bg-[#2D2E32]' : ''}`}
            >
              <Globe2 className="h-4 w-4 mr-3" />
              Discover
            </button>
            <button 
              onClick={() => setActiveSection('spaces')}
              className={`w-full flex items-center text-gray-300 hover:bg-[#2D2E32] px-3 py-2 rounded-lg ${activeSection === 'spaces' ? 'bg-[#2D2E32]' : ''}`}
            >
              <Box className="h-4 w-4 mr-3" />
              Spaces
            </button>
            <button 
              onClick={() => setActiveSection('library')}
              className={`w-full flex items-center text-gray-300 hover:bg-[#2D2E32] px-3 py-2 rounded-lg ${activeSection === 'library' ? 'bg-[#2D2E32]' : ''}`}
            >
              <Library className="h-4 w-4 mr-3" />
              Library
            </button>
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-gray-800">
          <div className="bg-[#2D2E32] rounded-lg p-4 mb-4">
            <h3 className="font-medium mb-1">Try Pro</h3>
            <p className="text-sm text-gray-400 mb-2">Upgrade for image upload, smarter AI, and more Pro Search.</p>
            <button className="text-sm text-[#00A3FF] flex items-center">
              Learn More
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <button className="flex items-center text-gray-400 text-sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </button>
            <button className="text-gray-400">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0 ml-0">
        <main className="flex-1 flex items-center justify-center px-4 py-12 lg:py-0">
          {renderMainContent()}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 p-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:space-x-4">
              <a href="#" className="hover:text-white">Pro</a>
              <a href="#" className="hover:text-white">Enterprise</a>
              <a href="#" className="hover:text-white hidden md:block">API</a>
              <a href="#" className="hover:text-white hidden md:block">Blog</a>
              <a href="#" className="hover:text-white hidden md:block">Careers</a>
              <a href="#" className="hover:text-white hidden md:block">Store</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="hover:text-white">English</button>
              <button className="hover:text-white">
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </div>
  );
}

export default App;