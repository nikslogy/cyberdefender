import React, { useState, useEffect } from 'react';

const cybersecurityFacts = [
  "Always use strong, unique passwords for each account.",
  "Enable two-factor authentication whenever possible.",
  "Keep your software and operating systems up to date.",
  "Be cautious when clicking on links or downloading attachments from unknown sources.",
  "Use a reputable antivirus software and keep it updated.",
  "Encrypt sensitive data, especially when transmitting over networks.",
  "Regularly backup your important data.",
  "Be wary of phishing attempts in emails or messages.",
  "Use a VPN when connecting to public Wi-Fi networks.",
  "Educate yourself and others about current cybersecurity threats and best practices."
];

const threatTypes = [
  { symbol: '▲', color: 'yellow', points: 1 },
  { symbol: '◆', color: 'red', points: 2 },
  { symbol: '★', color: 'purple', points: 3 },
];

const CyberDefenderGame = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [threats, setThreats] = useState([]);
  const [fact, setFact] = useState('');
  const [level, setLevel] = useState(1);
  const [showTutorial, setShowTutorial] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [powerUp, setPowerUp] = useState(null);

  useEffect(() => {
    if (!gameOver && !showTutorial) {
      const interval = setInterval(() => {
        addThreat();
      }, 2000 / level);

      return () => clearInterval(interval);
    }
  }, [gameOver, level, showTutorial]);

  useEffect(() => {
    if (threats.length >= 5) {
      setGameOver(true);
    }
  }, [threats]);

  useEffect(() => {
    if (score > 0 && score % 10 === 0) {
      setLevel(prevLevel => Math.min(prevLevel + 1, 5));
    }
  }, [score]);

  const addThreat = () => {
    const newThreat = {
      id: Date.now(),
      position: Math.floor(Math.random() * 3),
      type: threatTypes[Math.floor(Math.random() * threatTypes.length)]
    };
    setThreats(prevThreats => [...prevThreats, newThreat]);
  };

  const handleDefend = (position) => {
    const defendedThreats = threats.filter(threat => threat.position === position);
    if (defendedThreats.length > 0) {
      const pointsEarned = defendedThreats.reduce((sum, threat) => sum + threat.type.points, 0);
      setScore(prevScore => prevScore + pointsEarned);
      setThreats(prevThreats => prevThreats.filter(threat => threat.position !== position));
      setFact(cybersecurityFacts[Math.floor(Math.random() * cybersecurityFacts.length)]);

      if (Math.random() < 0.1) {
        setPowerUp('shield');
        setTimeout(() => setPowerUp(null), 5000);
      }
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setThreats([]);
    setFact('');
    setLevel(1);
    setPowerUp(null);
  };

  const shareGame = () => {
    const shareText = `I just scored ${score} points in CyberDefender! Can you beat my score? Play now at [Your Game URL]`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(shareUrl, '_blank');
  };

  const tutorialSteps = [
    "Welcome to CyberDefender! Your mission is to protect the network from cyber threats.",
    "Threats will appear at the bottom of each column. Click the shield buttons to neutralize them.",
    "Different threats have different point values. The faster you react, the higher your score!",
    "Watch out for power-ups! They'll give you temporary advantages.",
    "The game gets harder as you progress. How long can you keep the network safe?",
    "Ready to start? Click 'Start Game' to begin your cybersecurity adventure!"
  ];

  const renderTutorial = () => (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Tutorial</h2>
        <p style={{ marginBottom: '16px' }}>{tutorialSteps[tutorialStep]}</p>
        <div style={{ height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginBottom: '16px' }}>
          <div style={{ height: '100%', width: `${(tutorialStep + 1) / tutorialSteps.length * 100}%`, backgroundColor: '#4CAF50', borderRadius: '4px' }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => setShowTutorial(false)} style={{ padding: '8px 16px', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Skip</button>
          <button onClick={() => {
            if (tutorialStep < tutorialSteps.length - 1) {
              setTutorialStep(prev => prev + 1);
            } else {
              setShowTutorial(false);
            }
          }} style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {tutorialStep < tutorialSteps.length - 1 ? 'Next' : 'Start Game'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0', padding: '16px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>CyberDefender: Protect the Network</h1>
      <div style={{ marginBottom: '16px' }}>Score: {score} | Level: {level}</div>
      {gameOver ? (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Game Over!</h2>
          <p style={{ marginBottom: '16px' }}>Final Score: {score}</p>
          <button onClick={resetGame} style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' }}>Play Again</button>
          <button onClick={shareGame} style={{ padding: '8px 16px', backgroundColor: '#1DA1F2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Share Score</button>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', maxWidth: '400px', marginBottom: '16px' }}>
          {[0, 1, 2].map((position) => (
            <div key={position} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button 
                onClick={() => handleDefend(position)} 
                style={{ marginBottom: '8px', padding: '8px', backgroundColor: powerUp === 'shield' ? 'gold' : '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                🛡️
              </button>
              <div style={{ height: '128px', width: '64px', backgroundColor: '#e0e0e0', borderRadius: '4px', display: 'flex', flexDirection: 'column-reverse' }}>
                {threats
                  .filter(threat => threat.position === position)
                  .map(threat => (
                    <div key={threat.id} style={{ fontSize: '24px', color: threat.type.color, marginBottom: '4px' }}>{threat.type.symbol}</div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {fact && (
        <div style={{ marginTop: '16px', maxWidth: '400px', backgroundColor: '#e0e0e0', padding: '16px', borderRadius: '4px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Cybersecurity Tip:</h3>
          <p>{fact}</p>
        </div>
      )}
      {showTutorial && renderTutorial()}
      <div style={{ position: 'absolute', bottom: '16px', left: '16px', fontSize: '14px' }}>
        Created by Nikit Potdar
      </div>
      <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', gap: '8px' }}>
        <a href="https://linkedin.com/in/nikit-potdar" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#0077B5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        <a href="https://github.com/nikslogy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#181717"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
      </div>
    </div>
  );
};

export default CyberDefenderGame;