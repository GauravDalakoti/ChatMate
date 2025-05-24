import React, { useRef, useState } from 'react'
import { Search, Moon, MoreHorizontal, Bot, CircleUser, ChevronDown, MessageSquare, CheckSquare, Clock, Send, Zap, Bookmark, Smile, AlignJustify, Maximize2 } from 'lucide-react';
import { useContext } from 'react';
import { Context } from '../context/Context';


const CopiletSection = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, addToComposer,
        setAddToComposer } = useContext(Context)
    const [startConversation, setStartConversation] = useState(false)


    const textRef = useRef(null)

    const handleConversation = () => {

        setStartConversation(true)
        onSent()
    }

    const handleAddToComposer = () => {

        setAddToComposer(true)
        if (textRef.current) {
            const text = textRef.current.textContent;
            console.log(text);
            setInput(text)
        }
    }

    
    return (

        <div>
            {startConversation ? <div className='flex flex-col justify-between gap-5 p-4'>

                <div>
                    <div className='flex items-center gap-3'>
                        <CircleUser size={28} color='black' />
                        <div>You</div>
                    </div>
                    <div className='pl-10'>how do i get refund</div>
                </div>

                <div className='flex flex-col gap-2 min-h-[60vh]'>

                    <div className='flex items-center gap-3'>
                        <div className="bg-black text-white w-8 h-8 rounded-md flex items-center justify-center">
                            <MessageSquare size={20} />
                        </div>
                        <div>Fin</div>
                    </div>

                    {loading ?
                        <div className='pl-10 flex flex-col gap-3 '>
                            <div >Searching from relevant sources...</div>

                        </div>
                        :
                        <div className='bg-gradient-to-b from-[#d8d4f0] via-[#e9d9f3] to-[#f9d3e2] rounded-lg min-h-[25vh] p-3 ml-10 max-h-[55vh] overflow-x-scroll '>
                            <p ref={textRef} dangerouslySetInnerHTML={{ __html: resultData }}></p>

                            {resultData &&
                                <div onClick={handleAddToComposer} className='flex cursor-pointer items-center justify-center rounded-lg mt-4 gap-3 bg-white p-2'>

                                    <MessageSquare size={20} />
                                    <div >Add To Composor</div>
                                </div>
                            }

                        </div>
                    }
                </div>
                <div className="mt-auto">

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ask a follow up questions..."
                            className="w-full p-3 pl-3 pr-8 border border-gray-700 placeholder:text-gray-600 rounded-lg text-sm"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Send size={14} className="text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>
                :
                <div className="p-6 flex flex-col justify-around gap-36 h-[calc(100%-60px)]">

                    <div>
                        <div className="flex items-center justify-center mb-8 mt-16">
                            <div className="bg-black text-white w-10 h-10 rounded-md flex items-center justify-center">
                                <MessageSquare size={20} />
                            </div>
                        </div>
                        <div className="text-center mb-1">
                            <h3 className="text-lg font-medium">Hi, I'm Fin AI Copilot</h3>
                        </div>
                        <p className="text-sm text-gray-500 text-center mb-12">
                            Ask me anything about this conversation.
                        </p>
                    </div>
                    <div className="mt-auto">
                        <div className="bg-gray-100 rounded-lg p-3 mb-4">
                            <div className="text-sm text-gray-800 cursor-pointer">
                                <span onClick={handleConversation} className="text-sm cursor-pointer text-gray-500">Suggested💡 How do I get a refund? </span>
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ask a question..."
                                className="w-full p-2 pl-3 pr-8 border border-gray-700 placeholder:text-gray-700 rounded-lg text-sm"
                            />
                            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Send size={14} className="text-gray-700" />
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CopiletSection