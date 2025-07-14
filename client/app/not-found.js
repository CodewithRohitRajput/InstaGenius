'use client'
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0px 5px 15px rgba(228, 174, 11, 0.4)',
      transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 0.5
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 text-white">
      <Head>
        <title>404 - Page Not Found</title>
      </Head>

      <motion.div
        className="text-center max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated 404 Text */}
        <motion.div variants={itemVariants}>
          <motion.h1 
            className="text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'mirror'
            }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Title */}
        <motion.h2 
          className="text-4xl font-bold mb-6"
          variants={itemVariants}
        >
          Oops! Page Not Found, WILL COME SOON
        </motion.h2>

        {/* Description */}
        <motion.p 
          className="text-xl mb-10 text-gray-300"
          variants={itemVariants}
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          className="flex gap-4 justify-center"
          variants={itemVariants}
        >
          <Link href="/" passHref>
            <motion.a
              className="px-8 py-3 bg-amber-500 rounded-lg font-medium text-lg cursor-pointer"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Go Home
            </motion.a>
          </Link>
          
         
        </motion.div>

        {/* Floating Astronaut Animation */}
        <motion.div
          className="mt-16"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: "easeInOut"
          }}
        >
          <svg 
            width="150" 
            height="150" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
              fill="#E4AE0B"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            />
            <motion.path
              d="M19 14V19H17V14H19Z"
              fill="#E4AE0B"
              animate={{
                y: [0, -2, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5
              }}
            />
            <motion.path
              d="M7 14V19H5V14H7Z"
              fill="#E4AE0B"
              animate={{
                y: [0, -3, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 0.7
              }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;