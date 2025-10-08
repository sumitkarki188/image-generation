import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='mt-20'>
      {/* Desktop Layout */}
      <div className='hidden sm:flex items-center justify-between gap-4 py-3'>
        <img src={assets.logo} alt="" width={150}/>

        <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500'>
          Copyright © {currentYear}{' '}
          <span className='text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 transition-all duration-500 hover:scale-110 inline-block cursor-pointer hover:tracking-wider'>
            Sumit Singh Karki
          </span>
          {' '}| All rights reserved.
        </p>

        <div className='flex gap-2.5'>
          <a 
            href="https://github.com/sumitkarki188" 
            target="_blank" 
            rel="noopener noreferrer"
            title="GitHub"
            className='transform hover:scale-125 hover:rotate-12 transition-all duration-300 hover:drop-shadow-lg'
          >
            <img src={assets.facebook_icon} alt="GitHub" width={35} className='hover:brightness-110'/>
          </a>
          <a 
            href="https://www.instagram.com/karki_sumit_17/" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Instagram"
            className='transform hover:scale-125 hover:-rotate-12 transition-all duration-300 hover:drop-shadow-lg'
          >
            <img src={assets.instagram_icon} alt="Instagram" width={35} className='hover:brightness-110'/>
          </a>
          <a 
            href="https://www.linkedin.com/in/sumitsinghkarki/" 
            target="_blank" 
            rel="noopener noreferrer"
            title="LinkedIn"
            className='transform hover:scale-125 hover:rotate-12 transition-all duration-300 hover:drop-shadow-lg'
          >
            <img src={assets.instagram_icon} alt="LinkedIn" width={35} className='hover:brightness-110'/>
          </a>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='sm:hidden flex flex-col items-center gap-4 py-4'>
        <img src={assets.logo} alt="" width={120}/>
        
        <div className='text-center'>
          <p className='text-xs text-gray-500 mb-2'>
            Copyright © {currentYear}
          </p>
          <p className='text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2'>
            Sumit Singh Karki
          </p>
          <p className='text-xs text-gray-500'>
            All rights reserved.
          </p>
        </div>

        <div className='flex gap-4'>
          <a 
            href="https://github.com/sumitkarki188" 
            target="_blank" 
            rel="noopener noreferrer"
            title="GitHub"
            className='transform active:scale-110 transition-all duration-200'
          >
            <img src={assets.facebook_icon} alt="GitHub" width={32}/>
          </a>
          <a 
            href="https://www.instagram.com/karki_sumit_17/" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Instagram"
            className='transform active:scale-110 transition-all duration-200'
          >
            <img src={assets.instagram_icon} alt="Instagram" width={32}/>
          </a>
          <a 
            href="https://www.linkedin.com/in/sumitsinghkarki/" 
            target="_blank" 
            rel="noopener noreferrer"
            title="LinkedIn"
            className='transform active:scale-110 transition-all duration-200'
          >
            <img src={assets.instagram_icon} alt="LinkedIn" width={32}/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
