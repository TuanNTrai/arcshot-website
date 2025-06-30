
import React, { useState } from 'react';
import BallTracer from './components/BallTracer';
import Leaderboard from './components/Leaderboard';
import StatsBoard from './components/StatsBoard';
import { generateDrills, completeDrill } from './utils/practiceEngine';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('tracer');
  const [shotData, setShotData] = useState({
    ballSpeed: 0,
    launchAngle: 0,
    spinRate: 0
  });
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentDrills, setCurrentDrills] = useState([]);

  const handleShotCapture = (data) => {
    setShotData(data);
    // Process shot data and update stats
  };

  const startPracticeSession = async () => {
    setPracticeMode(true);
    const drills = await generateDrills();
    setCurrentDrills(drills);
  };

  const completePracticeDrill = async (drillId, xp) => {
    await completeDrill(drillId, xp);
    // Update UI and show completion
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🏌️ Golf Tracer Pro</h1>
        <nav className="tab-navigation">
          <button 
            className={activeTab === 'tracer' ? 'active' : ''}
            onClick={() => setActiveTab('tracer')}
          >
            Ball Tracer
          </button>
          <button 
            className={activeTab === 'practice' ? 'active' : ''}
            onClick={() => setActiveTab('practice')}
          >
            Practice Drills
          </button>
          <button 
            className={activeTab === 'stats' ? 'active' : ''}
            onClick={() => setActiveTab('stats')}
          >
            Stats
          </button>
          <button 
            className={activeTab === 'leaderboard' ? 'active' : ''}
            onClick={() => setActiveTab('leaderboard')}
          >
            Leaderboard
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'tracer' && (
          <BallTracer 
            shotData={shotData} 
            onShotCapture={handleShotCapture}
          />
        )}
        
        {activeTab === 'practice' && (
          <div className="practice-section">
            <h2>Practice Drills</h2>
            {!practiceMode ? (
              <button 
                className="start-practice-btn"
                onClick={startPracticeSession}
              >
                Start Practice Session
              </button>
            ) : (
              <div className="drills-container">
                {currentDrills.map((drill, index) => (
                  <div key={index} className="drill-card">
                    <h3>{drill.drill.name}</h3>
                    <p>{drill.reason}</p>
                    <p className="xp-reward">XP Reward: {drill.xpReward}</p>
                    <button 
                      onClick={() => completePracticeDrill(drill.drill.id, drill.xpReward)}
                    >
                      Complete Drill
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'stats' && <StatsBoard />}
        {activeTab === 'leaderboard' && <Leaderboard />}
      </main>
    </div>
  );
}

export default App;
