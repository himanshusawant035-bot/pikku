import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Image1 from './assets/image1.jpeg'
import Image2 from './assets/image2.jpeg'
import Image3 from './assets/image3.jpeg'
import Image4 from './assets/image4.jpeg'
import Image5 from './assets/image5.jpeg'
import Image6 from './assets/image6.jpeg'
import Image7 from './assets/image7.jpeg'
import Image8 from './assets/image8.jpeg'
import Image9 from './assets/image9.jpeg'
import Image10 from './assets/image10.jpeg'
import Image11 from './assets/image11.jpeg'
import Image12 from './assets/image12.jpeg'

const imageList = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10,
  Image11,
  Image12,
]

const App = () => {
  const [step, setStep] = useState(1);
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [noBtnPosition, setNoBtnPosition] = useState({ position: 'static' });
  const [noBtnText, setNoBtnText] = useState('No');
  
  // Ref for the container to append hearts to without re-rendering React state
  const heartsContainerRef = useRef(null);

  const noTexts = [
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You're breaking my heart!",
    "I'm gonna cry...",
    "Okay, fine :("
  ];

  // Effect to handle floating hearts background
  useEffect(() => {
    const createHeart = () => {
      if (!heartsContainerRef.current) return;

      const heart = document.createElement('div');
      heart.classList.add('heart-float');
      heart.innerHTML = ['❤️', '💖', '🌸', '✨', '💕'][Math.floor(Math.random() * 5)];
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
      // Randomize animation duration slightly
      heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
      
      heartsContainerRef.current.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 6000);
    };

    const intervalId = setInterval(createHeart, 300);
    return () => clearInterval(intervalId);
  }, []);

  // Handler for "No" button hover (run away)
  const handleNoHover = () => {
    if (noCount < 5) {
      const x = Math.random() * (window.innerWidth - 100); // 100 is approx btn width
      const y = Math.random() * (window.innerHeight - 50);
      setNoBtnPosition({
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        transition: 'all 0.2s ease'
      });
    }
  };

  // Handler for "No" button click
  const handleNoClick = () => {
    if (noCount < noTexts.length) {
      setNoBtnText(noTexts[noCount]);
      setNoCount(prev => prev + 1);
      setYesScale(prev => prev + 0.2);
    }
  };

  // Handler for "Yes" button click
  const handleYesClick = () => {
    setStep(2);
    // Burst of confetti
    for(let i = 0; i < 50; i++) {
      setTimeout(() => {
        if(heartsContainerRef.current) {
          const heart = document.createElement('div');
          heart.classList.add('heart-float');
          heart.innerHTML = ['❤️', '💖'][Math.floor(Math.random() * 2)];
          heart.style.left = Math.random() * 100 + 'vw';
          heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
          heart.style.animationDuration = '3s';
          heartsContainerRef.current.appendChild(heart);
          setTimeout(() => heart.remove(), 3000);
        }
      }, i * 20);
    }
  };

  const restart = () => {
    setStep(1);
    setNoCount(0);
    setYesScale(1);
    setNoBtnPosition({ position: 'static' });
    setNoBtnText("No");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Background Hearts Container */}
      <div ref={heartsContainerRef} id="hearts-container" className="absolute inset-0 pointer-events-none"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg">
        
        {/* Step 1: The Question */}
        {step === 1 && (
          <div className="glass rounded-3xl p-8 text-center flex flex-col items-center gap-6 fade-in">
            <div className="text-6xl mb-2">💝</div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text font-cursive">
              Will you be my Valentine?
            </h1>
            <p className="text-gray-600 text-lg">
              Every moment with you is like a beautiful dream.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-4 w-full relative h-20">
              <button 
                onClick={handleYesClick}
                style={{ transform: `scale(${yesScale})` }}
                className="bg-[#ff4d6d] hover:bg-[#ff758f] text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg transition-all active:scale-95 pulse-anim z-20"
              >
                Yes! 💖
              </button>
              
              <button 
                onMouseEnter={handleNoHover}
                onClick={handleNoClick}
                style={noBtnPosition}
                className="bg-gray-200 text-gray-600 px-10 py-4 rounded-full font-bold text-xl transition-all hover:bg-gray-300 z-10"
              >
                {noBtnText}
              </button>
            </div>
          </div>
        )}
          
        {/* Step 2: The Celebration */}
        {step === 2 && (
  <div className="glass rounded-3xl p-8 text-center flex flex-col items-center gap-10 fade-in max-w-5xl mx-auto w-full">
    <div>
      <h2 className="text-5xl font-bold gradient-text font-cursive mb-3">
        Memories And Love
      </h2>
    </div>
    
    <div className="photo-grid">
      {imageList.map((url, index) => {
        // Create a slight random tilt for each photo
        const randomRotate = (index % 2 === 0 ? (index + 1) * 1.5 : (index + 1) * -1.5);
        
        return (
          <div 
            key={index} 
            className="photo-item"
            style={{ transform: `rotate(${randomRotate}deg)` }}
          >
            <img 
              src={url} 
              alt={`Memory ${index + 1}`} 
              className="rounded-sm shadow-inner"
            />
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <span className="font-cursive text-gray-400 text-2xl">
                {["Chandra and Sasa", "Shirdi Vishes", "Achievements", "Family", "Moments", "Girly gang","Abhinay","Prayog","Vijeta","Champ","Panji Sadi IT IS","The Best"][index % 12]}
              </span>
            </div>
          </div>
        );
      })}
    </div>

    <button 
      onClick={() => setStep(3)} 
      className="mt-6 bg-[#ff4d6d] hover:bg-[#ff758f] text-white px-12 py-4 rounded-full font-bold text-lg shadow-lg transition-all hover:scale-105"
    >
      Read My Heart 💌
    </button>
  </div>
)}

        {/* Step 3: The Love Note */}
        {step === 3 && (
          <div className="glass rounded-3xl p-8 text-center flex flex-col items-center gap-6 fade-in">
            <div className="text-5xl">💌</div>
            <div className="font-cursive text-3xl text-[#ff4d6d] mb-4">
              Dear Pikkuuuu!
            </div>
            <div className="space-y-4 text-gray-700 italic leading-relaxed">
            "Happy valentine day pikuuuu! As I said peechle saal hi love is not about relationship but it’s 
            all about whom you love the most! And this time I totally mean it as you can see all the memories of 
            the people or things joh tumare dil Ke kareeb hai! Jaise panji ki saadi ho ya natyakarmi ki family; 
            Aain sobat cute photo and Ruhi sobat chi masti! Abh mujhe ye mat puchna photos kaha se mile and 
            definitely you love this people the most! So this valentine’s,
             from him who love you the most and from her to them jinko she love the most!
            Aur shayad ishi liye me ek bhi memories and love section mein nahi hu and genuinely Me mere memories ya fir shayar’s
            dalke I don’t wanna bore you again also I know me itna bhi tere dil Ke kareeb nahi hu but yes always wishing 
            to be that one or in other words ek sapna but let it be and sakalich tujha mood off hota so no riskkkk! 
            Hehehe!!
            <br/>Yours???
            <br/>Himanshu mcc (irfan khan)"
            </div>
            <div className="w-24 h-px bg-pink-200 my-4"></div>
            <div className="text-sm uppercase tracking-widest text-gray-400">
              Happy Valentine's Day
            </div>
            
            <button 
              onClick={restart} 
              className="mt-4 text-xs text-gray-400 hover:text-gray-600"
            >
              Replay the Magic
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;