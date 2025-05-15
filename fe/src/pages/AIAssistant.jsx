import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Menu, X, Sparkles } from 'lucide-react';
import axios from 'axios';
import { BASE_AI } from '@/url/baseurl';

export default function AIAssistant() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios.post(`${BASE_AI}/chat`, {
                message: input
            });

            const aiMessage = { role: 'assistant', content: response.data.response };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = { 
                role: 'assistant', 
                content: 'Sorry, I encountered an error. Please try again.' 
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex bg-background">
            

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-screen">
                {/* Header */}
                <div className="h-14 border-b border-primary/20 flex items-center px-4">
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="md:hidden p-2 hover:bg-primary/5 rounded-lg"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                    <h1 className="text-lg font-semibold ml-4">AI Assistant</h1>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-3xl mx-auto px-4 py-8">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                    <Sparkles className="w-8 h-8 text-primary" />
                                </div>
                                <h1 className="text-2xl font-semibold mb-2">Welcome to AI Assistant</h1>
                                <p className="text-muted-foreground mb-8">
                                    Your healthcare companion powered by AI
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                                    {[
                                        "What are the common symptoms of flu?",
                                        "How can I improve my sleep quality?",
                                        "What are the benefits of regular exercise?",
                                        "How to maintain a healthy diet?"
                                    ].map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setInput(suggestion)}
                                            className="p-4 rounded-lg bg-primary/5 hover:bg-primary/10 text-left text-sm text-foreground transition-colors"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex gap-4 ${
                                            message.role === 'user' ? 'justify-end' : 'justify-start'
                                        }`}
                                    >
                                        {message.role === 'assistant' && (
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Bot className="w-4 h-4 text-primary" />
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-[85%] rounded-lg p-4 ${
                                                message.role === 'user'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-primary/5 text-foreground'
                                            }`}
                                        >
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                        </div>
                                        {message.role === 'user' && (
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <User className="w-4 h-4 text-primary" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="bg-primary/5 rounded-lg p-4">
                                            <div className="flex gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" />
                                                <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce delay-100" />
                                                <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce delay-200" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="border-t border-primary/20 p-4">
                    <div className="max-w-3xl mx-auto">
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Message AI Assistant..."
                                className="w-full rounded-lg border-2 border-primary/20 bg-background px-4 py-3 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                        <p className="text-xs text-muted-foreground text-center mt-2">
                            AI Assistant may produce inaccurate information about people, places, or facts.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
