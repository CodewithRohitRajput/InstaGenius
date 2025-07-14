


import React from 'react'
import Image from "next/image";
import { FiCopy, FiRefreshCw, FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const page = () => {
  return (
    <div>
       <footer className="py-6 border-t border-amber-600 pt-10 bg-white dark:bg-black">
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
                  The ultimate AI-powered Instagram bio generator
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
                <a href="/terms" className="text-sm text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Terms</a>
                <a href="/privacy-policy" className="text-sm text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Privacy</a>
                <a href="/about" className="text-sm text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">About</a>
                <a href="/contact" className="text-sm text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Contact</a>
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
  )
}

export default page
