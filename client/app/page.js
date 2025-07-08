'use client'

import { useState, useEffect } from 'react';
import { FiCopy, FiInstagram, FiRefreshCw, FiBookmark, FiTwitter, FiLinkedin, FiGithub, FiHash } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';

export default function CaptionGenerator() {
  const [prompt, setPrompt] = useState('');
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [tone, setTone] = useState('trendy');
  const [hashtagCount, setHashtagCount] = useState(5);
  const [savedCaptions, setSavedCaptions] = useState([]);

  useEffect(() => {
    document.title = "InstaGenius | AI-Powered Instagram Caption Generator";
  }, []);

  const generateCaptions = async () => {
    if (!prompt.trim()) {
      setError('Please describe your photo');
      return;
    }
    
    setLoading(true);
    setError(null);
    setCaptions([]);

    try {
      const res = await fetch('http://localhost:3000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          prompt: `Generate 5 Instagram captions for: "${prompt}". 
          Tone: ${tone}. 
          Include ${hashtagCount} relevant hashtags. 
          Include 1-2 relevant emojis.
          Make them professional and platform-optimized.
          Format: Caption [line break] hashtags`
        })
      });

      const data = await res.json();
      const generatedCaptions = data.reply.split('\n\n')
        .filter(c => c.trim())
        .map(caption => {
          const [text, ...tags] = caption.split('\n');
          const cleanTags = tags.join(' ').replace(/#/g, '').split(' ').filter(tag => tag.trim());
          return {
            text: text.trim(),
            tags: cleanTags
          };
        });
      setCaptions(generatedCaptions);
    } catch (err) {
      setError('Failed to generate captions. Please try again.');
      console.error(err);
    }

    setLoading(false);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const saveCaption = (caption) => {
    setSavedCaptions([...savedCaptions, caption]);
  };

  const regenerateCaptions = () => {
    if (prompt.trim()) generateCaptions();
  };

  const tones = [
    { id: 'trendy', label: 'Trendy', emoji: '🔥' },
    { id: 'funny', label: 'Funny', emoji: '😂' },
    { id: 'inspirational', label: 'Inspo', emoji: '✨' },
    { id: 'professional', label: 'Professional', emoji: '💼' },
    { id: 'casual', label: 'Casual', emoji: '😊' },
    { id: 'sassy', label: 'Sassy', emoji: '💁‍♀️' }
  ];

  return (
    <>
      <Head>
        <title>InstaGenius | AI-Powered Instagram Caption Generator</title>
        <meta name="description" content="Generate perfect Instagram captions with AI. Get creative, funny, or professional captions with hashtags for any photo in seconds." />
        <meta name="keywords" content="Instagram captions, AI caption generator, social media content, hashtag generator, Instagram post ideas" />
        <meta property="og:title" content="InstaGenius - AI-Powered Instagram Caption Generator" />
        <meta property="og:description" content="Generate viral-worthy Instagram captions with hashtags in seconds using AI" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 to-indigo-50">
        
     <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mt-7 leading-tight">
  Welcome to <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent font-bold">
  InstaGenius
</span>

</h1>
<p className="text-center text-gray-500 text-sm mt-2">
  AI-powered Instagram caption generator for creative, catchy, and optimized content.
</p>



        
        <main className="flex-grow mt-1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full mr-4">
                    <FiInstagram className="text-white text-2xl" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text ">InstaGenius</h1>
                    <p className="text-sm text-gray-500">AI-Powered Instagram Caption Generator</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                    What's in your photo? 
                    <span className="text-xs text-gray-500 ml-1">(Be descriptive for better results)</span>
                  </label>
                  <textarea
                    id="prompt"
                    rows={3}
                    className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="E.g. Beach sunset with friends, birthday party with balloons, hiking adventure with mountain views..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Caption Tone <span className="text-xs text-gray-500">(Select one)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {tones.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTone(t.id)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
                            tone === t.id 
                              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span className="mr-1">{t.emoji}</span>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hashtag Count <span className="text-xs text-gray-500">(3-10 recommended)</span>
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="15"
                        value={hashtagCount}
                        onChange={(e) => setHashtagCount(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-3 w-8 text-center text-black font-medium">{hashtagCount}</span>
                      <FiHash className="ml-1 text-gray-500" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={generateCaptions}
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all flex items-center justify-center ${
                    loading 
                      ? 'bg-pink-400' 
                      : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    '✨ Generate Viral Captions'
                  )}
                </button>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-red-500 text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </div>

              <AnimatePresence>
                {(captions.length > 0 || loading) && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="bg-gray-50 border-t border-gray-200"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Your Captions</h2>
                        <div className="flex space-x-3">
                          <button 
                            onClick={regenerateCaptions}
                            className="text-pink-500 hover:text-pink-600 flex items-center text-sm"
                          >
                            <FiRefreshCw className="mr-1" /> Regenerate
                          </button>
                        </div>
                      </div>

                      {loading && captions.length === 0 ? (
                        <div className="space-y-4">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <AnimatePresence>
                            {captions.map(({text, tags}, index) => (                            
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                              >
                                <div className="whitespace-pre-line text-gray-800 mb-3">{text}</div>
                                {tags.length > 0 && (
                                  <div className="text-sm text-pink-500 flex flex-wrap gap-2">
                                    {tags.map((tag, i) => (
                                      <span key={i}>#{tag}</span>
                                    ))}
                                  </div>
                                )}
                                <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => copyToClipboard(`${text}\n\n${tags.map(t => `#${t}`).join(' ')}`, index)}
                                    className="p-1 text-gray-400 hover:text-pink-500 transition-colors"
                                    aria-label="Copy to clipboard"
                                    title="Copy"
                                  >
                                    <FiCopy />
                                  </button>
                                  <button
                                    onClick={() => saveCaption(`${text}\n\n${tags.map(t => `#${t}`).join(' ')}`)}
                                    className="p-1 text-gray-400 hover:text-pink-500 transition-colors"
                                    aria-label="Save caption"
                                    title="Save"
                                  >
                                    <FiBookmark />
                                  </button>
                                </div>
                                {copiedIndex === index && (
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute top-2 right-10 text-xs bg-pink-500 text-white px-2 py-1 rounded"
                                  >
                                    Copied!
                                  </motion.span>
                                )}
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {savedCaptions.length > 0 && (
                <div className="bg-gray-100 border-t border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Saved Captions</h2>
                  <div className="space-y-3">
                    {savedCaptions.map((caption, index) => {
                      const [text, ...tags] = caption.split('\n\n');
                      return (
                        <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 text-sm">
                          <div className="whitespace-pre-line text-gray-800 mb-2">{text}</div>
                          {tags.length > 0 && (
                            <div className="text-xs text-pink-500 flex flex-wrap gap-1">
                              {tags.join(' ').split(' ').filter(tag => tag.trim()).map((tag, i) => (
                                <span key={i}>{tag}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </main>

        
      </div>
    </>
  );
}