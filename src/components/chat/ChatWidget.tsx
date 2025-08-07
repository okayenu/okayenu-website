// social-update: 982
// chat-update: 981

































































































































































































































































































































































































































































































































'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles, RotateCcw } from 'lucide-react'
import { useChatStore } from '@/lib/store'

export default function ChatWidget() {
  const { messages, isOpen, toggleChat, addMessage, clearMessages, isLoading } = useChatStore()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    addMessage({ role: 'user', content: userMsg })

    setTimeout(() => {
      const responses = [
        'Great choice! Based on your style preferences, I\'d recommend checking out our new Minimalist Edit collection. The pieces are versatile and perfect for building a capsule wardrobe.',
        'I can help with that! For the best fit, I\'d suggest going with your usual size. Our reviews show this item runs true to size for most body types.',
        'Looking for something specific? Try our Shuffle Mode feature - just describe the vibe you\'re going for and I\'ll curate a selection for you.',
        'That\'s a fantastic pick! It pairs beautifully with our Street Culture collection pieces. Would you like me to suggest some outfit combinations?',
        'I\'d recommend the Navy colorway - it\'s been a bestseller this season and works great for both casual and smart-casual occasions.',
      ]
      addMessage({
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        suggestions: ['Show me more', 'Add to cart', 'Different style'],
      })
    }, 1000)
  }

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-fitsona-500 to-fitsona-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="gradient-hero p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Fitsona Assistant</h3>
                <p className="text-white/70 text-xs">Your personal style guide</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={clearMessages} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors" aria-label="Reset chat">
                <RotateCcw size={16} />
              </button>
              <button onClick={toggleChat} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors" aria-label="Close chat">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-fitsona-500 text-white rounded-br-md'
                    : 'bg-gray-100 text-navy-800 rounded-bl-md'
                }`}>
                  <p className="leading-relaxed">{msg.content}</p>
                  {msg.suggestions && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.suggestions.map(s => (
                        <button
                          key={s}
                          onClick={() => { setInput(s) }}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                            msg.role === 'user'
                              ? 'bg-white/20 text-white hover:bg-white/30'
                              : 'bg-white text-fitsona-500 hover:bg-fitsona-50 border border-fitsona-200'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-gray-50">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend() }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about style, fit, sizing..."
                className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-fitsona-400 focus:ring-1 focus:ring-fitsona-100 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-3 bg-fitsona-500 text-white rounded-xl hover:bg-fitsona-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
