'use client'

import { useState, useEffect } from 'react';
import { FiCopy, FiRefreshCw, FiBookmark, FiHash, FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import './page.css'

export default function CaptionGenerator() {
  const [prompt, setPrompt] = useState('');
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [tone, setTone] = useState('trendy');
  const [hashtagCount, setHashtagCount] = useState(5);
  const [savedCaptions, setSavedCaptions] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.title = "InstaGenius | AI-Powered Instagram Caption Generator";
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const generateCaptions = async () => {
    if (!prompt.trim()) {
      setError('Please describe your photo');
      return;
    }
    
    setLoading(true);
    setError(null);
    setCaptions([]);

    try {
      const res = await fetch('https://instagenius.onrender.com/ask', {
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
    { id: 'professional', label: 'Pro', emoji: '💼' },
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

      <div className="flex flex-col min-h-screen bg-white dark:bg-black  ">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white mt-7 leading-tight">
          Welcome to <span className="bg-gradient-to-r from-orange-700 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-bold">
            InstaGenius
          </span>
        </h1>
        <p className="text-center text-black dark:text-white text-sm mt-2">
          AI-powered Instagram caption generator for creative, catchy, and optimized content.
        </p>

        <div className="flex justify-end mr-10 mt-4 md:-translate-y-24 -translate-x-8 md:translate-x-0 ">
          <label className="theme-switch">
            <input 
              type="checkbox" 
              className="theme-switch__checkbox" 
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <div className="theme-switch__container">
              <div className="theme-switch__clouds"></div>
              <div className="theme-switch__stars-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z" fill="currentColor"></path>
                </svg>
              </div>
              <div className="theme-switch__circle-container">
                <div className="theme-switch__sun-moon-container">
                  <div className="theme-switch__moon">
                    <div className="theme-switch__spot"></div>
                    <div className="theme-switch__spot"></div>
                    <div className="theme-switch__spot"></div>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>

        <main className="flex-grow py-12 px-4  sm:px-6 lg:px-8 md:-mt-20 bg-white dark:bg-black">
          <div className="max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-black rounded-2xl shadow-xl overflow-hidden dark:shadow-amber-500 "
            >
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div>
                    <Image 
                      src='/icon_1.png' 
                      width={80}
                      height={80}
                      alt='logo'
                      className='rounded-lg'
                    />
                  </div>
                  <div className='md:ml-10 ml-5'>
                    <h1 className="text-3xl font-bold text-black dark:text-white">
                      <span className="bg-gradient-to-r from-orange-700 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-bold">
                        InstaGenius
                      </span>
                    </h1>
                    <p className="text-sm text-black dark:text-white">AI-Powered Instagram Caption Generator</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="prompt" className="block text-sm font-medium text-black dark:text-white mb-2">
                    What is in your photo? 
                    <span className="text-xs text-black dark:text-white ml-1">(Be descriptive for better results)</span>
                  </label>
                  <textarea
                    id="prompt"
                    rows={3}
                    className="w-full text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    placeholder="E.g. Beach sunset with friends, birthday party with balloons, hiking adventure with mountain views..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      Caption Tone <span className="text-xs text-orange-500 dark:text-orange-400">(Select one)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {tones.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTone(t.id)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
                            tone === t.id 
                              ? 'bg-gradient-to-r from-orange-700 via-orange-500 to-yellow-500 text-white shadow-md'
                              : 'bg-white dark:bg-black text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800'
                          }`}
                        >
                          <span className="mr-1">{t.emoji}</span>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      Hashtag Count <span className="text-xs text-orange-500 dark:text-orange-400">(3-10 recommended)</span>
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="15"
                        value={hashtagCount}
                        onChange={(e) => setHashtagCount(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
                      />
                      <span className="ml-3 w-8 text-center text-black dark:text-white font-medium">{hashtagCount}</span>
                      <FiHash className="ml-1 text-orange-500 dark:text-orange-400" />
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col justify-center items-center gap-8 mt-10  ">
                  {!loading && (
                    <button
                      type="button"
                      className="btn"
                      onClick={generateCaptions}
                    >
                      <strong>Generate</strong>
                      <div id="container-stars">
                        <div id="stars"></div>
                      </div>
                      <div id="glow">
                        <div className="circle"></div>
                        <div className="circle"></div>
                      </div>
                    </button>
                  )}

                  {loading && (
                    <svg
                      className="pencil"
                      viewBox="0 0 200 200"
                      width="100px"
                      height="100px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <clipPath id="pencil-eraser">
                          <rect rx="5" ry="5" width="30" height="30" />
                        </clipPath>
                      </defs>
                      <circle
                        className="pencil__stroke"
                        r="70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="439.82 439.82"
                        strokeDashoffset="439.82"
                        strokeLinecap="round"
                        transform="rotate(-113,100,100)"
                      />
                      <g className="pencil__rotate" transform="translate(100,100)">
                        <g fill="none">
                          <circle
                            className="pencil__body1"
                            r="64"
                            stroke="hsl(30, 30%, 50%)"
                            strokeWidth="30"
                            strokeDasharray="402.12 402.12"
                            strokeDashoffset="402"
                            transform="rotate(-90)"
                          />
                          <circle
                            className="pencil__body2"
                            r="74"
                            stroke="hsl(30, 30%, 60%)"
                            strokeWidth="10"
                            strokeDasharray="464.96 464.96"
                            strokeDashoffset="465"
                            transform="rotate(-90)"
                          />
                          <circle
                            className="pencil__body3"
                            r="54"
                            stroke="hsl(30, 30%, 40%)"
                            strokeWidth="10"
                            strokeDasharray="339.29 339.29"
                            strokeDashoffset="339"
                            transform="rotate(-90)"
                          />
                        </g>
                        <g className="pencil__eraser" transform="rotate(-90) translate(49,0)">
                          <g className="pencil__eraser-skew">
                            <rect fill="hsl(30, 20%, 90%)" rx="5" ry="5" width="30" height="30" />
                            <rect fill="hsl(30, 20%, 85%)" width="5" height="30" clipPath="url(#pencil-eraser)" />
                            <rect fill="hsl(30, 20%, 80%)" width="30" height="20" />
                            <rect fill="hsl(30, 20%, 75%)" width="15" height="20" />
                            <rect fill="hsl(30, 20%, 85%)" width="5" height="20" />
                            <rect fill="hsla(30, 20%, 75%, 0.2)" y="6" width="30" height="2" />
                            <rect fill="hsla(30, 20%, 75%, 0.2)" y="13" width="30" height="2" />
                          </g>
                        </g>
                        <g className="pencil__point" transform="rotate(-90) translate(49,-30)">
                          <polygon fill="hsl(33,90%,70%)" points="15 0,30 30,0 30" />
                          <polygon fill="hsl(33,90%,50%)" points="15 0,6 30,0 30" />
                          <polygon fill="hsl(223,10%,10%)" points="15 0,20 10,10 10" />
                        </g>
                      </g>
                    </svg>
                  )}
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-red-500 dark:text-red-400 text-sm"
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
                    className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-600"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-black dark:text-white">Your Captions</h2>
                        <div className="flex space-x-3">
                          <button 
                            onClick={regenerateCaptions}
                            className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 flex items-center text-sm"
                          >
                            <FiRefreshCw className="mr-1" /> Regenerate
                          </button>
                        </div>
                      </div>

                      {loading && captions.length === 0 ? (
                        <div className="space-y-4">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-20 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse"></div>
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
                                className="relative group bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                              >
                                <div className="whitespace-pre-line text-black dark:text-white mb-3">{text}</div>
                                {tags.length > 0 && (
                                  <div className="text-sm text-orange-500 dark:text-orange-400 flex flex-wrap gap-2">
                                    {tags.map((tag, i) => (
                                      <span key={i}>#{tag}</span>
                                    ))}
                                  </div>
                                )}
                                <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => copyToClipboard(`${text}\n\n${tags.map(t => `#${t}`).join(' ')}`, index)}
                                    className="p-1 text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                                    aria-label="Copy to clipboard"
                                    title="Copy"
                                  >
                                    <FiCopy />
                                  </button>
                                  <button
                                    onClick={() => saveCaption(`${text}\n\n${tags.map(t => `#${t}`).join(' ')}`)}
                                    className="p-1 text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
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
                                    className="absolute top-2 right-10 text-xs bg-orange-500 dark:bg-orange-400 text-white px-2 py-1 rounded"
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
                <div className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-600 p-6">
                  <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Saved Captions</h2>
                  <div className="space-y-3">
                    {savedCaptions.map((caption, index) => {
                      const [text, ...tags] = caption.split('\n\n');
                      return (
                        <div key={index} className="bg-white dark:bg-black p-3 rounded-lg border border-gray-200 dark:border-gray-600 text-sm">
                          <div className="whitespace-pre-line text-black dark:text-white mb-2">{text}</div>
                          {tags.length > 0 && (
                            <div className="text-xs text-orange-500 dark:text-orange-400 flex flex-wrap gap-1">
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

        <footer className="py-6 border-t border-amber-600 mt-10  bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2">
                <Image 
                  src="/ig_bg.png"
                  width={100}
                  height={100}
                  alt='Logo'
                />
              </div>
              
              <div className="mt-4 md:mt-0 text-center md:text-right">
                <p className="text-sm text-black dark:text-white">
                  The ultimate AI-powered Instagram caption generator
                </p>
                <p className="text-xs text-black dark:text-white mt-1">
                  © {new Date().getFullYear()} InstaGenius. All rights reserved.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex space-x-4">
                <a href="#" className="text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  <FiTwitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  <FiLinkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  <FiGithub className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600 flex flex-col md:flex-row justify-between items-center">
              <nav className="flex flex-wrap justify-center space-x-4 md:space-x-6">
                <a href="#" className="text-sm text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Terms</a>
                <a href="#" className="text-sm text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Privacy</a>
                <a href="#" className="text-sm text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Cookies</a>
                <a href="#" className="text-sm text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Contact</a>
              </nav>
              
              <div className="mt-4 md:mt-0">
                <p className="text-xs text-black dark:text-white">
                  Made by ROHIT SINGH RAJPUT
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}