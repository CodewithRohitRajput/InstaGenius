'use client'

import { useState, useEffect } from 'react';
import { FiCopy, FiInstagram, FiRefreshCw, FiBookmark, FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';

export default function Footer() {
  // ... (keep all your existing state and functions)

  return (
    <>
     

      <div className="min-h-screen -mt-96  bg-gradient-to-br from-pink-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="max-w-2xl mx-auto flex-grow">
          {/* ... (keep all your existing content up to the final div) */}
        </div>

        {/* Professional Footer */}
        <footer className="mt-96 py-6 border-t border-gray-200 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2">
                <Image 
                  src="/ig_bg.png"
                  width={200}
                  height={200}
                  alt='Logo'
                />
                
              </div>
              
              <div className="mt-4 md:mt-0 text-center md:-ml-20 md:text-right">
                <p className="text-sm text-gray-600">
                  The ultimate AI-powered Instagram caption generator
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  © {new Date().getFullYear()} InstaGenius. All rights reserved.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-pink-500 transition-colors">
                  <FiTwitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-pink-500 transition-colors">
                  <FiLinkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-pink-500 transition-colors">
                  <FiGithub className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
              <nav className="flex flex-wrap justify-center space-x-4 md:space-x-6">
                <a href="#" className="text-sm text-gray-500 hover:text-pink-500 transition-colors">Terms</a>
                <a href="#" className="text-sm text-gray-500 hover:text-pink-500 transition-colors">Privacy</a>
                <a href="#" className="text-sm text-gray-500 hover:text-pink-500 transition-colors">Cookies</a>
                <a href="#" className="text-sm text-gray-500 hover:text-pink-500 transition-colors">Contact</a>
              </nav>
              
              <div className="mt-4 md:mt-0">
                <p className="text-xs text-gray-400">
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