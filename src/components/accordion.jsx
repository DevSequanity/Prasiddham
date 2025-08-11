
import React from 'react';
// Astro image import for background
// import { Image } from 'astro:assets';
// import heroImage from '../images/home.JPG';

const Accordion = () => {
  return (
    <section
      className="body-font relative"
      style={{
        backgroundImage: `url('/src/images/home.JPG')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-amber-50/80 w-full h-full absolute top-0 left-0 z-0"></div>
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center relative z-10">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-orange-800">Slow-carb next level shoindcgoitch ethical authentic, poko scenester</h1>
          <p className="leading-relaxed mt-4 text-orange-600">Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin.</p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-white/80 border border-amber-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-lg">
          <h2 className="text-orange-800 text-lg font-medium title-font mb-5">Sign Up</h2>
          <div className="relative mb-4">
            <label htmlFor="full-name" className="leading-7 text-sm text-orange-700">Full Name</label>
            <input type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-amber-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-orange-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-orange-700">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-amber-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-orange-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <button className="text-white bg-gradient-to-r from-amber-500 to-orange-500 border-0 py-2 px-8 focus:outline-none hover:from-orange-600 hover:to-amber-600 rounded text-lg transition-all duration-200">Button</button>
          <p className="text-xs text-orange-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
        </div>
      </div>
    </section>
  );
};

export default Accordion;