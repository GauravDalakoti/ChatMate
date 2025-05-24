import { useState, useEffect, useRef } from 'react';
import { Search, Moon, MoreHorizontal,Menu,X, Italic, Bot, CircleUser, Link, ChevronDown, MessageSquare, CheckSquare, Clock, Send, Zap, Bookmark, Smile, AlignJustify, Maximize2, Code, Code2, CodeXml, SquareDashedBottomCode } from 'lucide-react';
import { useContext } from 'react';
import { Context } from './context/Context';
import { inboxData } from './dummyData/dummyData';
import DetailSection from './components/DetailSection';
import CopiletSection from './components/CopiletSection';

export default function CustomerSupportInbox() {

 const [activeConversation, setActiveConversation] = useState({
    id: 1,
    name: "Luis Easton",
    messages: [
      {
        id: 1,
        sender: "customer",
        content: "I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you'd be able to refund me, as it is un-opened.",
        time: "1min",
        seen: false,
      },
      {
        id: 2,
        sender: "agent",
        content: "Let me just look into this for you, Luis.",
        time: "1min",
        seen: true,
      },
    ],
  });

  const { setInput, input, addToComposer, setAddToComposer } = useContext(Context);
  const [selectedId, setSelectedId] = useState(1);
  const [mobileViewMode, setMobileViewMode] = useState('inbox'); // 'inbox', 'conversation', 'sidebar'
  const [currentSection, setCurrentSection] = useState("CopiletSection");
  const [showAiOptions, setShowAIOptions] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectConversation = (id, item) => {
    setSelectedId(id);
    if (window.innerWidth < 768) {
      setMobileViewMode('conversation');
    }
    setActiveConversation({
      id: item.id,
      name: item.name,
      source: item.source,
      avatar: item.avatar,
      avatarColor: item.avatarColor,
      messages: item.messages
    });
  };

  const handleBackToInbox = () => {
    setMobileViewMode('inbox');
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const newMessage = {
      id: activeConversation.messages.length + 1,
      sender: "agent",
      content: input,
      time: "just now",
      seen: false,
    };

    setActiveConversation((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

    setInput("");
    setAddToComposer(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    setInput("How do i get refund");
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case "DetailSection":
        return <DetailSection />;
      case "CopiletSection":
        return <CopiletSection />;
      default:
        return <CopiletSection />;
    }
  };

  const textareaRef = useRef(null);
  const [selectedText, setSelectedText] = useState('');

  const handleSelection = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start !== end) {
      const text = textarea.value.substring(start, end);
      setSelectedText(text);
    } else {
      setSelectedText('');
    }
  };

  const handleAiOptions = () => {
    setShowAIOptions((prev) => !prev);
  };

  return (
   
      <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">
        {/* Mobile Menu Button */}
        <button 
          className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Sidebar/Inbox */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 
          fixed md:relative 
          z-40 
          w-full sm:w-80 
          h-full 
          bg-white 
          border-r border-gray-200 
          transition-transform duration-300 ease-in-out
          ${mobileViewMode === 'conversation' && !sidebarOpen ? 'hidden md:block' : ''}
        `}>
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold mt-8 md:mt-0">Your inbox</h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center mt-3 space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="flex items-center bg-white border border-gray-300 rounded-md px-2 py-1">
                <span className="text-sm font-medium mr-1">5 Open</span>
                <ChevronDown size={16} />
              </div>
              <div className="flex items-center bg-white border border-gray-300 rounded-md px-2 py-1">
                <span className="text-sm font-medium mr-1">Waiting longest</span>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100%-140px)]">
            {inboxData.map(item => (
              <div
                key={item.id}
                className={`p-4 border-b border-gray-200 flex items-start hover:bg-gray-50 cursor-pointer transition-colors ${selectedId === item.id ? 'bg-gray-100' : ''}`}
                onClick={() => {
                  handleSelectConversation(item.id, item);
                  setSidebarOpen(false);
                }}
              >
                <div className={`w-8 h-8 rounded-full ${item.avatarColor} text-white flex items-center justify-center flex-shrink-0 text-sm`}>
                  {item.avatar}
                </div>
                <div className="ml-3 flex-grow min-w-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="font-medium text-sm">{item.name}</span>
                      {item.source && <span className="text-xs text-gray-500 ml-1 hidden sm:inline">· {item.source}</span>}
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{item.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{item.preview}</p>
                  {item.subPreview && <p className="text-xs text-gray-500">{item.subPreview}</p>}
                </div>
                {item.flagged && <div className="ml-2 text-yellow-500">⚠</div>}
                {item.unread && <div className="ml-2 w-2 h-2 bg-black rounded-full"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main conversation area */}
        <div className={`flex-1 flex flex-col min-w-0 ${mobileViewMode === 'inbox' && !sidebarOpen ? 'hidden md:flex' : 'flex'}`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
            <div className="flex items-center min-w-0">
              {mobileViewMode === 'conversation' && (
                <button onClick={handleBackToInbox} className="mr-2 md:hidden">
                  <AlignJustify size={20} />
                </button>
              )}
              <h2 className="text-lg font-medium truncate">{activeConversation.name}</h2>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hidden sm:block">
                <MoreHorizontal size={20} />
              </button>
              <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hidden sm:block">
                <Moon size={20} />
              </button>
              <button className="bg-black text-white px-3 py-1 rounded-md text-sm font-medium">
                Close
              </button>
            </div>
          </div>

          {/* Conversation messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {activeConversation.messages.map(message => (
              <div key={message.id} className={`mb-4 flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] sm:max-w-3/4 rounded-lg p-3 ${message.sender === 'customer' ? 'bg-white border border-gray-200' : 'bg-blue-100'}`}>
                  <div className="text-sm">{message.content}</div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center">
                    {message.sender === 'customer' && (
                      <>
                        <Clock size={12} className="mr-1" />
                        {message.time}
                      </>
                    )}
                    {message.sender === 'agent' && (
                      <>
                        {message.seen && <span>Seen · {message.time}</span>}
                        {!message.seen && <span>{message.time}</span>}
                      </>
                    )}
                  </div>
                </div>
                {message.sender === 'agent' && (
                  <div className='flex flex-col ml-2'>
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img 
                        src="https://img.freepik.com/premium-photo/memoji-emoji-handsome-smiling-man-white-background_826801-6987.jpg?semt=ais_hybrid&w=740" 
                        className='rounded-full border border-black w-full h-full object-cover' 
                        alt="" 
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 space-y-2 sm:space-y-0">
              <div className="flex items-center">
                <button className="bg-white p-1 text-gray-600 flex items-center rounded">
                  <MessageSquare size={18} className="mr-1" />
                  <div className="text-sm">Chat</div>
                  <ChevronDown size={14} className="ml-1" />
                </button>
              </div>
              <div className="text-sm text-gray-500 hidden sm:block">Use ⌘K for shortcuts</div>
            </div>
            
            <div className={`border relative border-gray-700 rounded-lg p-2 flex items-center ${addToComposer === true && 'flex-col items-start w-full'}`}>
              <textarea
                ref={textareaRef}
                onMouseUp={handleSelection}
                onKeyUp={handleSelection}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                value={input}
                placeholder="Type a message..."
                className={`flex-grow bg-transparent outline-none text-sm mt-2 placeholder:text-gray-700 resize-none ${addToComposer === true ? 'h-40 w-full' : 'h-auto'}`}
                rows={addToComposer ? 6 : 1}
              />

              {selectedText && (
                <div className="mt-2 flex cursor-pointer left-4 sm:left-20 gap-3 sm:gap-6 py-4 items-center absolute bottom-56 bg-white border px-3 rounded-lg shadow max-w-[90%] overflow-x-auto">
                  <div onClick={handleAiOptions} className='font-bold text-xs p-1 text-white bg-black rounded-sm'>AI</div>
                  <div className='font-bold text-lg'>B</div>
                  <div><Italic className="w-5 h-5 font-bold text-gray-900" /></div>
                  <div><Link className="w-5 h-5 font-bold text-gray-900" /></div>
                  <div><CodeXml className="w-5 h-5 font-bold text-gray-900" /></div>
                  <div className='font-bold text-lg hidden sm:block'>H1</div>
                  <div className='font-bold text-lg hidden sm:block'>H2</div>
                  <div><SquareDashedBottomCode className="w-5 h-5 font-bold text-gray-900" /></div>
                </div>
              )}

              {showAiOptions && (
                <div className="mt-2 flex flex-col cursor-pointer bottom-72 left-2 sm:left-10 gap-1 py-4 items-center absolute bg-white border px-4 sm:px-6 rounded-lg shadow z-10">
                  <div className='hover:bg-gray-100 px-4 sm:px-10 py-2 rounded-sm text-sm'>Rephrase</div>
                  <div className='hover:bg-gray-100 px-4 sm:px-10 rounded-sm py-2 text-sm'>My tone of voice</div>
                  <div className='hover:bg-gray-100 px-4 sm:px-10 rounded-sm py-2 text-sm'>More Friendly</div>
                  <div className='hover:bg-gray-100 px-4 sm:px-10 rounded-sm py-2 text-sm'>More Formal</div>
                  <div className='hover:bg-gray-100 px-4 sm:px-10 rounded-sm py-2 text-sm'>Fix grammar and spelling</div>
                  <div className='hover:bg-gray-100 px-4 sm:px-10 rounded-sm py-2 text-sm'>Translate...</div>
                </div>
              )}

              <div className="flex items-center space-x-1 mt-2 sm:mt-0">
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <Zap size={18} />
                </button>
                <button className="p-1 text-gray-500 hover:text-gray-700 hidden sm:block">
                  <Bookmark size={18} />
                </button>
                <button className="p-1 text-gray-500 hover:text-gray-700 hidden sm:block">
                  <Smile size={18} />
                </button>
                <button 
                  onClick={handleSendMessage} 
                  className="ml-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium flex items-center"
                >
                  Send
                  <ChevronDown size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Copilot sidebar - Mobile bottom sheet on small screens */}
        <div className="hidden lg:block w-[350px] xl:w-[400px] bg-white border-l border-gray-200">
          <div className="flex p-4 border-b border-gray-200">
            <button 
              onClick={() => setCurrentSection("CopiletSection")} 
              className={`${currentSection === "CopiletSection" && "bg-blue-100 text-blue-800 font-medium"} px-3 py-1 rounded-md text-sm font-medium mr-3`}
            >
              AI Copilot
            </button>
            <button 
              onClick={() => setCurrentSection("DetailSection")} 
              className={`${currentSection === "DetailSection" && "bg-blue-100 text-blue-800 font-medium"} px-3 py-1 rounded-md text-sm font-medium mr-3`}
            >
              Details
            </button>
          </div>
          <div className="h-[calc(100vh-80px)] overflow-y-auto">
            {renderSection()}
          </div>
        </div>

        {/* Mobile AI Copilot - Bottom sheet */}
        <button 
          className="fixed bottom-4 right-4 lg:hidden bg-black text-white p-3 rounded-full shadow-lg z-50"
          onClick={() => setMobileViewMode(mobileViewMode === 'sidebar' ? 'conversation' : 'sidebar')}
        >
          <Bot size={24} />
        </button>

        {mobileViewMode === 'sidebar' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setCurrentSection("CopiletSection")} 
                    className={`${currentSection === "CopiletSection" && "bg-blue-100 text-blue-800 font-medium"} px-3 py-1 rounded-md text-sm font-medium`}
                  >
                    AI Copilot
                  </button>
                  <button 
                    onClick={() => setCurrentSection("DetailSection")} 
                    className={`${currentSection === "DetailSection" && "bg-blue-100 text-blue-800 font-medium"} px-3 py-1 rounded-md text-sm font-medium`}
                  >
                    Details
                  </button>
                </div>
                <button onClick={() => setMobileViewMode('conversation')}>
                  <X size={24} />
                </button>
              </div>
              <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
                {renderSection()}
              </div>
            </div>
          </div>
        )}

     </div> 
)
}


