import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Menu, X, Sparkles, Upload, File } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const GEMINI_API_KEY = 'AIzaSyDp5-QtTAzVxlYjyKUHIgJ5rC_XTg25Aq8';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const MEDICAL_ANALYSIS_PROMPT = `You are a medical report analyzer. Please analyze this medical report and provide a comprehensive analysis following this structure:

1. PATIENT INFORMATION (if available):
   - Basic details
   - Age, gender, etc.

2. KEY FINDINGS:
   - List all significant medical findings
   - Highlight any abnormal values
   - Note any critical results

3. INTERPRETATION:
   - Explain what these findings mean
   - Identify any concerning patterns
   - Note any values outside normal ranges

4. RECOMMENDATIONS:
   - Suggested follow-up actions
   - Lifestyle modifications if applicable
   - Additional tests if needed

5. IMPORTANT NOTES:
   - Any critical warnings
   - Time-sensitive issues
   - Required immediate attention items

Please format the response clearly and use simple language that patients can understand. Here's the report content:`;

const VALIDATION_PROMPT = `You are a medical report validator. Your task is to determine if the following content appears to be a medical report or medical-related document. Look for medical terminology, test results, diagnoses, or health-related information. Only respond with either "YES" or "NO". Here's the content to validate:`;

// Function to format the response text
const formatResponse = (text) => {
    // Remove markdown headings (# symbols)
    text = text.replace(/^#+\s/gm, '');
    
    // Remove bold/italic markers
    text = text.replace(/\*\*/g, '');
    text = text.replace(/\*/g, '');
    
    // Remove underscores used for emphasis
    text = text.replace(/_/g, '');
    
    // Handle bullet points
    text = text.replace(/^\s*[-•]\s/gm, '• ');
    
    // Remove any excessive newlines
    text = text.replace(/\n{3,}/g, '\n\n');
    
    return text.trim();
};

// Add CSS for animations
const ThinkingAnimation = () => (
    <div className="flex gap-2 items-center p-4 bg-primary/5 rounded-lg">
        <Bot className="w-5 h-5 text-primary animate-bounce" />
        <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '300ms' }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '600ms' }} />
        </div>
    </div>
);

const GradientBackground = () => (
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5 opacity-50" />
);

const FileUploadAnimation = () => (
    <div className="flex gap-2 items-center p-4 bg-primary/5 rounded-lg">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center animate-bounce">
            <Upload className="w-4 h-4 text-primary" />
        </div>
        <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '300ms' }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '600ms' }} />
        </div>
        <span className="text-sm text-primary ml-2">Processing report...</span>
    </div>
);

const FileMessage = ({ fileName }) => (
    <div className="flex items-center gap-3 animate-fadeIn">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center animate-scaleIn">
            <File className="w-5 h-5 text-primary" />
        </div>
        <div className="flex flex-col">
            <span className="text-sm font-medium">Medical Report</span>
            <span className="text-xs opacity-70">{fileName}</span>
        </div>
    </div>
);

export default function AIAssistant() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [uploadedFile, setUploadedFile] = useState(null);
    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Check file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please upload a PDF or image file (JPEG/PNG)');
            return;
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB');
            return;
        }

        setUploadedFile(file);
        setIsUploading(true);
        
        // Create a message to show the uploaded file
        const fileMessage = {
            role: 'user',
            content: file.name,
            file: file
        };
        setMessages(prev => [...prev, fileMessage]);

        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const fileContent = e.target.result;
                const base64Content = fileContent.split(',')[1];

                setIsUploading(false);
                setIsLoading(true);

                try {
                    // First, validate if it's a medical report
                    const validationResponse = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                        contents: [{
                            parts: [{ text: `${VALIDATION_PROMPT} ${base64Content.substring(0, 1000)}...` }]
                        }]
                    }, {
                        headers: { 'Content-Type': 'application/json' }
                    });

                    const isValidMedicalReport = validationResponse.data.candidates?.[0]?.content?.parts?.[0]?.text.trim().toUpperCase() === 'YES';

                    if (!isValidMedicalReport) {
                        const errorMessage = {
                            role: 'assistant',
                            content: '⚠️ This document does not appear to be a medical report. Please ensure you upload a valid medical report containing health-related information such as:\n\n- Lab test results\n- Medical diagnoses\n- Health records\n- Clinical observations\n- Treatment plans\n\nIf you believe this is a mistake, try uploading a clearer image or a properly formatted medical document.'
                        };
                        setMessages(prev => [...prev, errorMessage]);
                        return;
                    }

                    // If it's a valid medical report, proceed with analysis
                    const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                        contents: [{
                            parts: [{ text: `${MEDICAL_ANALYSIS_PROMPT} ${base64Content}` }]
                        }]
                    }, {
                        headers: { 'Content-Type': 'application/json' }
                    });

                    const aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not analyze the report.';
                    const aiMessage = { role: 'assistant', content: aiResponse };
                    setMessages(prev => [...prev, aiMessage]);
                } catch (error) {
                    console.error('Error analyzing file:', error);
                    const errorMessage = {
                        role: 'assistant',
                        content: 'Sorry, I encountered an error while analyzing the report. Please try again.'
                    };
                    setMessages(prev => [...prev, errorMessage]);
                } finally {
                    setIsLoading(false);
                }
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Error reading file:', error);
            const errorMessage = {
                role: 'assistant',
                content: 'Sorry, I encountered an error while reading the file. Please try again.'
            };
            setMessages(prev => [...prev, errorMessage]);
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Include context about uploaded file if it exists
            const context = uploadedFile 
                ? `Context: A medical report '${uploadedFile.name}' has been uploaded. `
                : '';

            const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                contents: [{
                    parts: [{ text: context + input }]
                }]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
            const aiMessage = { role: 'assistant', content: aiResponse };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                role: 'assistant',
                content: 'Sorry, I encountered an error while processing your request. Please try again.'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // Custom components for markdown rendering
    const MarkdownComponents = {
        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-3" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-lg font-bold mb-2" {...props} />,
        p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        code: ({ node, inline, ...props }) => (
            inline ? (
                <code className="bg-primary/10 rounded px-1 py-0.5 font-mono text-sm" {...props} />
            ) : (
                <code className="block bg-primary/10 p-4 rounded-lg mb-4 overflow-x-auto font-mono text-sm" {...props} />
            )
        ),
        pre: ({ node, ...props }) => (
            <pre className="bg-primary/10 p-4 rounded-lg mb-4 overflow-x-auto font-mono text-sm" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary/50 pl-4 italic mb-4" {...props} />
        ),
        em: ({ node, ...props }) => <em className="italic" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
    };

    return (
        <div className="h-screen flex bg-background relative overflow-hidden">
            <GradientBackground />
            
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-screen relative z-10">
                {/* Header */}
                <div className="h-16 border-b border-primary/20 flex items-center px-6 backdrop-blur-sm bg-background/80">
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="md:hidden p-2 hover:bg-primary/5 rounded-lg transition-colors"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                    <div className="flex items-center gap-3 ml-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-primary" />
                        </div>
                        <h1 className="text-xl font-semibold">AI Health Assistant</h1>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-primary/10 hover:bg-primary/20 transition-all transform hover:scale-105 active:scale-95 group"
                        >
                            <Upload className="w-4 h-4 group-hover:animate-bounce" />
                            Upload Report
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-4xl mx-auto px-4 py-8">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-8 animate-pulse">
                                    <Sparkles className="w-10 h-10 text-primary" />
                                </div>
                                <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                    Welcome to AI Health Assistant
                                </h1>
                                <p className="text-lg text-muted-foreground mb-12 max-w-md">
                                    Your intelligent healthcare companion powered by advanced AI
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
                                            className="p-4 rounded-lg bg-primary/5 hover:bg-primary/10 text-left text-sm transition-all transform hover:scale-105 hover:shadow-lg"
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
                                        } animate-slideIn`}
                                    >
                                        {message.role === 'assistant' && (
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Bot className="w-4 h-4 text-primary" />
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-[85%] rounded-lg p-4 shadow-md transition-all ${
                                                message.role === 'user'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-primary/5 hover:bg-primary/10 text-foreground'
                                            }`}
                                        >
                                            {message.role === 'user' ? (
                                                message.file ? (
                                                    <FileMessage fileName={message.content} />
                                                ) : (
                                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                        {message.content}
                                                    </p>
                                                )
                                            ) : (
                                                <div className="text-sm markdown-content">
                                                    <ReactMarkdown components={MarkdownComponents}>
                                                        {message.content}
                                                    </ReactMarkdown>
                                                </div>
                                            )}
                                        </div>
                                        {message.role === 'user' && (
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <User className="w-4 h-4 text-primary" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isUploading && (
                                    <div className="flex justify-start animate-slideIn">
                                        <FileUploadAnimation />
                                    </div>
                                )}
                                {isLoading && (
                                    <div className="flex justify-start animate-slideIn">
                                        <ThinkingAnimation />
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="border-t border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="max-w-4xl mx-auto p-4">
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Message AI Assistant..."
                                className="w-full rounded-lg border-2 border-primary/20 bg-background/50 px-4 py-3 pr-12 text-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/40"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-110 active:scale-95"
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
