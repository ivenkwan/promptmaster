import React, { useState } from 'react';
import { BookOpen, PenTool, CheckCircle, ChevronRight, Info, Award, RefreshCw, User, MessageSquare, FileText, Layout, Sparkles, Play, Zap, AlertCircle, Wand2, Dices } from 'lucide-react';

// Helper to get API Key safely across environments
const getApiKey = () => {
  // @ts-ignore - Handles Vite env vars when deployed
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) {
    // @ts-ignore
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  return ''; // Fallback for Canvas injection
};

const TrainingApp = () => {
  const [activeTab, setActiveTab] = useState('learn');

  const renderContent = () => {
    switch (activeTab) {
      case 'learn':
        return <LearnSection />;
      case 'builder':
        return <PromptBuilder />;
      case 'quiz':
        return <QuizSection />;
      default:
        return <LearnSection />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              PromptMaster
            </h1>
          </div>
          <nav className="flex space-x-1 sm:space-x-4">
            <NavButton
              active={activeTab === 'learn'}
              onClick={() => setActiveTab('learn')}
              icon={<BookOpen size={18} />}
              label="The Framework"
            />
            <NavButton
              active={activeTab === 'builder'}
              onClick={() => setActiveTab('builder')}
              icon={<PenTool size={18} />}
              label="Prompt Builder"
            />
            <NavButton
              active={activeTab === 'quiz'}
              onClick={() => setActiveTab('quiz')}
              icon={<CheckCircle size={18} />}
              label="Quiz"
            />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-6 text-center text-slate-400 text-sm">
        <p>Based on the Gemini for Google Workspace Prompting Guide 101</p>
      </footer>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      active
        ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
        : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </button>
);

// --- Section: Learn ---

const LearnSection = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">The 4 Pillars of a Perfect Prompt</h2>
        <p className="text-lg text-slate-600">
          Just like a conversation, a good prompt needs structure. According to the Google Workspace guide, effective prompts usually contain four key ingredients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PillarCard
          icon={<User className="text-purple-500" size={32} />}
          title="1. Persona"
          description="Who is Gemini acting as?"
          example="You are an expert Project Manager..."
          color="bg-purple-50 border-purple-100"
          textColor="text-purple-700"
        />
        <PillarCard
          icon={<MessageSquare className="text-blue-500" size={32} />}
          title="2. Task"
          description="What do you need Gemini to do? (The Verb)"
          example="Draft an email... Summarize this report..."
          color="bg-blue-50 border-blue-100"
          textColor="text-blue-700"
        />
        <PillarCard
          icon={<FileText className="text-amber-500" size={32} />}
          title="3. Context"
          description="What background info is needed?"
          example="The tone should be professional. The audience is new hires..."
          color="bg-amber-50 border-amber-100"
          textColor="text-amber-700"
        />
        <PillarCard
          icon={<Layout className="text-emerald-500" size={32} />}
          title="4. Format"
          description="How do you want the result to look?"
          example="Limit to 3 bullet points. Create a table..."
          color="bg-emerald-50 border-emerald-100"
          textColor="text-emerald-700"
        />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mt-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Info size={20} className="mr-2 text-blue-500" />
          Pro Tips from the Guide
        </h3>
        <ul className="space-y-3 text-slate-600">
          <li className="flex items-start">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded mr-3 mt-1">LENGTH</span>
            The most successful prompts average around 21 words. Don't be too brief!
          </li>
          <li className="flex items-start">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded mr-3 mt-1">FILES</span>
            Use your own documents. In Gemini, typing "@" lets you reference specific files for context.
          </li>
          <li className="flex items-start">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded mr-3 mt-1">ITERATE</span>
            Treat it like a chat. If the first output isn't perfect, ask follow-up questions to refine it.
          </li>
        </ul>
      </div>
    </div>
  );
};

const PillarCard = ({ icon, title, description, example, color, textColor }) => (
  <div className={`p-6 rounded-2xl border ${color} transition-transform hover:scale-[1.02] cursor-default`}>
    <div className="mb-4">{icon}</div>
    <h3 className={`text-xl font-bold mb-2 ${textColor}`}>{title}</h3>
    <p className="text-slate-700 font-medium mb-4">{description}</p>
    <div className="bg-white/60 p-3 rounded-lg text-sm text-slate-600 italic">
      "${example}"
    </div>
  </div>
);

// --- Section: Builder ---

const PromptBuilder = () => {
  const [persona, setPersona] = useState('');
  const [task, setTask] = useState('');
  const [context, setContext] = useState('');
  const [format, setFormat] = useState('');
  
  // AI State
  const [generationResult, setGenerationResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [critiqueResult, setCritiqueResult] = useState('');
  const [isCritiquing, setIsCritiquing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isSurprising, setIsSurprising] = useState(false);
  const [error, setError] = useState('');

  const isComplete = persona && task && context && format;
  const fullPrompt = `You are a ${persona}. ${task} ${context}. Please format the output as ${format}.`;

  const copyToClipboard = () => {
    // Fallback for iframe environments
    const textArea = document.createElement("textarea");
    textArea.value = fullPrompt;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert('Prompt copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy to clipboard.');
    }
    document.body.removeChild(textArea);
  };

  const handleRunPrompt = async () => {
    if (!isComplete) return;
    setIsGenerating(true);
    setError('');
    setCritiqueResult(''); // Clear previous critique if any
    
    try {
      const apiKey = getApiKey();
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }]
        })
      });

      if (!response.ok) throw new Error('Failed to generate content');
      
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
      setGenerationResult(text);
    } catch (err) {
      setError("Failed to run prompt. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCritiquePrompt = async () => {
    if (!isComplete) return;
    setIsCritiquing(true);
    setError('');
    setGenerationResult(''); // Clear previous generation if any

    const critiquePromptText = `
      Act as a prompt engineering expert. Analyze the following prompt based on the "4 Pillars" framework (Persona, Task, Context, Format).
      
      User's Prompt: "${fullPrompt}"

      Please provide:
      1. A rating out of 10.
      2. Specific advice on how to improve the Persona, Task, Context, or Format.
      3. A rewritten, optimized version of the prompt.
    `;

    try {
      const apiKey = getApiKey();
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: critiquePromptText }] }]
        })
      });

      if (!response.ok) throw new Error('Failed to critique content');
      
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No critique generated.";
      setCritiqueResult(text);
    } catch (err) {
      setError("Failed to get critique. Please try again.");
      console.error(err);
    } finally {
      setIsCritiquing(false);
    }
  };

  const handleOptimize = async () => {
    if (!persona && !task && !context && !format) {
        setError("Please fill in at least one field to optimize.");
        return;
    }
    setIsOptimizing(true);
    setError('');
    
    const optimizePrompt = `
      Act as an expert prompt engineer. I have a draft prompt broken into 4 parts.
      Please rewrite each part to be more specific, detailed, and effective, while keeping the original intent.
      
      Current Draft:
      Persona: ${persona}
      Task: ${task}
      Context: ${context}
      Format: ${format}
      
      Return ONLY a JSON object with the keys: "persona", "task", "context", "format".
    `;

    try {
      const apiKey = getApiKey();
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: optimizePrompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      const data = await response.json();
      const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (jsonText) {
        const optimized = JSON.parse(jsonText);
        if (optimized.persona) setPersona(optimized.persona);
        if (optimized.task) setTask(optimized.task);
        if (optimized.context) setContext(optimized.context);
        if (optimized.format) setFormat(optimized.format);
      } else {
        throw new Error("No JSON response");
      }
    } catch (e) {
      setError("Failed to optimize. Try again.");
      console.error(e);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleSurpriseMe = async () => {
    setIsSurprising(true);
    setError('');
    
    const surprisePrompt = `
      Generate a realistic, professional scenario for a user to practice writing AI prompts.
      Create a "Persona", "Task", "Context", and "Format" for this scenario.
      The scenario should be for a business context (e.g., Marketing, HR, Engineering, Sales).
      
      Return ONLY a JSON object with the keys: "persona", "task", "context", "format".
    `;

    try {
      const apiKey = getApiKey();
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: surprisePrompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      const data = await response.json();
      const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (jsonText) {
        const scenario = JSON.parse(jsonText);
        if (scenario.persona) setPersona(scenario.persona);
        if (scenario.task) setTask(scenario.task);
        if (scenario.context) setContext(scenario.context);
        if (scenario.format) setFormat(scenario.format);
      } else {
        throw new Error("No JSON response");
      }
    } catch (e) {
      setError("Failed to generate scenario. Try again.");
      console.error(e);
    } finally {
      setIsSurprising(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Prompt Builder Workshop</h2>
        <p className="text-slate-600">Fill in the blocks to construct a powerful prompt, then test it live with Gemini.</p>
        
        <button
            onClick={handleSurpriseMe}
            disabled={isSurprising}
            className="mt-4 text-sm inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
            {isSurprising ? (
                <RefreshCw className="animate-spin mr-1" size={14} />
            ) : (
                <Dices className="mr-1" size={14} />
            )}
            {isSurprising ? 'Generating...' : 'Surprise Me with a Scenario'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-fit">
          <div className="p-6 space-y-6">
            
            {/* Persona Input */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-purple-700 mb-1">
                1. Persona (Who?)
              </label>
              <input
                type="text"
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                placeholder="e.g., Senior Marketing Manager"
                className="w-full p-3 bg-purple-50 border-2 border-transparent focus:border-purple-300 rounded-lg outline-none transition-all placeholder:text-purple-300/70"
              />
              <p className="text-xs text-slate-400 mt-1">Give the AI a role to assume.</p>
            </div>

            {/* Task Input */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-blue-700 mb-1">
                2. Task (Do what?)
              </label>
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="e.g., Draft a promotional email for our summer sale"
                className="w-full p-3 bg-blue-50 border-2 border-transparent focus:border-blue-300 rounded-lg outline-none transition-all placeholder:text-blue-300/70"
              />
              <p className="text-xs text-slate-400 mt-1">Start with a strong verb.</p>
            </div>

            {/* Context Input */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-amber-700 mb-1">
                3. Context (Details?)
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="e.g., Targeted at existing customers who haven't purchased in 6 months. Tone should be warm and urgent."
                className="w-full p-3 bg-amber-50 border-2 border-transparent focus:border-amber-300 rounded-lg outline-none transition-all placeholder:text-amber-300/70 resize-none h-24"
              />
              <p className="text-xs text-slate-400 mt-1">Provide background, audience, and constraints.</p>
            </div>

            {/* Format Input */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-emerald-700 mb-1">
                4. Format (Look like?)
              </label>
              <input
                type="text"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                placeholder="e.g., a bulleted list with 3 main points"
                className="w-full p-3 bg-emerald-50 border-2 border-transparent focus:border-emerald-300 rounded-lg outline-none transition-all placeholder:text-emerald-300/70"
              />
            </div>

            {/* Optimize Button */}
            <button
                onClick={handleOptimize}
                disabled={isOptimizing || (!persona && !task && !context && !format)}
                className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center transition-all ${
                    isOptimizing
                      ? 'bg-amber-100 text-amber-700 cursor-wait'
                      : (!persona && !task && !context && !format)
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-lg hover:shadow-orange-500/20'
                  }`}
            >
                {isOptimizing ? (
                    <RefreshCw className="animate-spin mr-2" size={16} />
                ) : (
                    <Wand2 className="mr-2" size={16} />
                )}
                {isOptimizing ? 'Optimizing Inputs...' : 'Magic Optimize Inputs ✨'}
            </button>

          </div>
        </div>

        {/* Output & AI Section */}
        <div className="space-y-6">
          {/* Constructed Prompt Preview */}
          <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-700 overflow-hidden text-slate-200 flex flex-col h-full max-h-[300px] lg:max-h-none">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
                <PenTool size={14} className="mr-2" />
                Prompt Preview
              </h3>
              {isComplete && (
                <button onClick={copyToClipboard} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded transition-colors">
                  Copy Text
                </button>
              )}
            </div>
            
            <div className="p-6 font-mono text-sm leading-relaxed overflow-y-auto flex-grow">
              {isComplete ? (
                <>
                  <span className="text-purple-400">You are a {persona}.</span>{' '}
                  <span className="text-blue-400">{task}</span>{' '}
                  <span className="text-amber-400">{context}.</span>{' '}
                  <span className="text-emerald-400">Please format the output as {format}.</span>
                </>
              ) : (
                <span className="text-slate-600 italic">Fill in the fields on the left to build your prompt...</span>
              )}
            </div>

            {/* AI Action Buttons */}
            <div className="p-4 bg-slate-800 border-t border-slate-700 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRunPrompt}
                disabled={!isComplete || isGenerating || isCritiquing || isOptimizing}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm flex items-center justify-center transition-all ${
                  !isComplete
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : isGenerating
                      ? 'bg-blue-600/50 text-white cursor-wait'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/20'
                }`}
              >
                {isGenerating ? (
                  <RefreshCw className="animate-spin mr-2" size={16} />
                ) : (
                  <Play className="mr-2 fill-current" size={16} />
                )}
                {isGenerating ? 'Running...' : 'Test Prompt ✨'}
              </button>

              <button
                onClick={handleCritiquePrompt}
                disabled={!isComplete || isGenerating || isCritiquing || isOptimizing}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm flex items-center justify-center transition-all ${
                  !isComplete
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : isCritiquing
                      ? 'bg-purple-600/50 text-white cursor-wait'
                      : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg hover:shadow-purple-500/20'
                }`}
              >
                 {isCritiquing ? (
                  <RefreshCw className="animate-spin mr-2" size={16} />
                ) : (
                  <Sparkles className="mr-2" size={16} />
                )}
                {isCritiquing ? 'Analyzing...' : 'Get Critique ✨'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Results Area */}
      {(generationResult || critiqueResult || error) && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
           {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center mb-6">
              <AlertCircle size={20} className="mr-3" />
              {error}
            </div>
          )}

          {generationResult && (
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
              <div className="bg-blue-50 p-4 border-b border-blue-100 flex items-center">
                <Zap className="text-blue-600 mr-2" size={20} />
                <h3 className="font-bold text-blue-800">Gemini Response</h3>
              </div>
              <div className="p-6 whitespace-pre-wrap font-sans text-slate-700 leading-relaxed bg-slate-50/50 max-h-[500px] overflow-y-auto">
                {generationResult}
              </div>
            </div>
          )}

          {critiqueResult && (
            <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
              <div className="bg-purple-50 p-4 border-b border-purple-100 flex items-center">
                <Sparkles className="text-purple-600 mr-2" size={20} />
                <h3 className="font-bold text-purple-800">Prompt Critique</h3>
              </div>
              <div className="p-6 whitespace-pre-wrap font-sans text-slate-700 leading-relaxed bg-slate-50/50 max-h-[500px] overflow-y-auto">
                {critiqueResult}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- Section: Quiz ---

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [error, setError] = useState('');

  const [questions, setQuestions] = useState([
    {
      question: "Which of these is NOT one of the 4 pillars of an effective prompt?",
      options: ["Persona", "Task", "Speed", "Context"],
      correct: 2,
      explanation: "The 4 pillars are Persona, Task, Context, and Format. Speed depends on the model!"
    },
    {
      question: "According to Google's research, how long is the average 'successful' prompt?",
      options: ["5 words", "9 words", "21 words", "50 words"],
      correct: 2,
      explanation: "Successful prompts average 21 words. Most people only use 9, which is often too short for complex tasks."
    },
    {
      question: "If Gemini gives you a result you don't like, what is the best next step?",
      options: ["Start over completely", "Iterate and ask follow-up questions", "Give up", "Use a different tool"],
      correct: 1,
      explanation: "Treat it like a conversation! Ask Gemini to refine, shorten, or change the tone of the output."
    },
    {
      question: "Which specific character allows you to tag/reference your own files in Gemini?",
      options: ["# (Hashtag)", "@ (At symbol)", "/ (Slash)", "* (Asterisk)"],
      correct: 1,
      explanation: "Using the @ symbol allows you to pull context directly from your Google Drive files."
    }
  ]);

  const handleAnswer = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const generateNewQuiz = async () => {
    setIsGeneratingQuiz(true);
    setError('');
    
    const quizPrompt = `
      Create a 5-question multiple choice quiz about "Prompt Engineering for Business".
      Focus on concepts like Persona, Task, Context, Format, tone, iteration, and specificity.
      
      Return ONLY a JSON array of objects. Each object must have this exact structure:
      {
        "question": "The question text";
        "options": ["Option A", "Option B", "Option C", "Option D"];
        "correct": 0, // index of correct option (0-3)
        "explanation": "Why this answer is correct"
      }
    `;

    try {
      const apiKey = getApiKey();
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: quizPrompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      const data = await response.json();
      const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (jsonText) {
        const newQuestions = JSON.parse(jsonText);
        // Basic validation
        if (Array.isArray(newQuestions) && newQuestions.length > 0 && newQuestions[0].options) {
            setQuestions(newQuestions);
            resetQuiz();
        } else {
            throw new Error("Invalid quiz format received");
        }
      } else {
        throw new Error("No JSON response");
      }
    } catch (e) {
      setError("Failed to generate quiz. Using default questions.");
      console.error(e);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 animate-in zoom-in duration-300">
        <Award size={64} className="mx-auto text-yellow-500 mb-6" />
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Quiz Complete!</h2>
        <p className="text-xl text-slate-600 mb-8">
          You scored <span className="font-bold text-blue-600">{score}</span> out of <span className="font-bold">{questions.length}</span>
        </p>
        <div className="flex justify-center space-x-4">
             <button
              onClick={resetQuiz}
              className="inline-flex items-center px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-full font-medium transition-colors"
            >
              <RefreshCw size={20} className="mr-2" />
              Replay
            </button>
            <button
              onClick={generateNewQuiz}
              disabled={isGeneratingQuiz}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
            >
              {isGeneratingQuiz ? (
                  <RefreshCw className="animate-spin mr-2" size={20} />
              ) : (
                  <Sparkles className="mr-2" size={20} />
              )}
              {isGeneratingQuiz ? 'Generating...' : 'New Quiz ✨'}
            </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex justify-between items-end">
        <div>
            <h2 className="text-2xl font-bold text-slate-900">Knowledge Check</h2>
            {error && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="mr-1" size={12}/> {error}</p>}
        </div>
        
        <div className="flex items-center space-x-4">
             <button
                onClick={generateNewQuiz}
                disabled={isGeneratingQuiz}
                className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center"
            >
                {isGeneratingQuiz ? <RefreshCw className="animate-spin mr-1" size={12}/> : <Sparkles className="mr-1" size={12}/>}
                {isGeneratingQuiz ? 'Building...' : 'Generate Fresh Quiz ✨'}
            </button>
            <span className="text-sm font-medium text-slate-500">Question {currentQuestion + 1} of {questions.length}</span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-medium text-slate-800 mb-6 leading-relaxed">
          {q.question}
        </h3>

        <div className="space-y-3">
          {q.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                isAnswered
                  ? index === q.correct
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : index === selectedAnswer
                    ? 'bg-red-50 border-red-500 text-red-700'
                    : 'border-slate-100 text-slate-400'
                  : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {isAnswered && index === q.correct && <CheckCircle className="text-green-600" size={20} />}
              </div>
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
            <p className={`text-sm mb-4 ${selectedAnswer === q.correct ? 'text-green-600' : 'text-slate-600'}`}
            >
              <span className="font-bold">{selectedAnswer === q.correct ? 'Correct!' : 'Not quite.'}</span> {q.explanation}
            </p>
            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center justify-center transition-colors"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
              <ChevronRight className="ml-1" size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingApp;