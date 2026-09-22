import { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Zap, Trophy, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import MatchCard from '../components/MatchCard';
import StatCard from '../components/StatCard';
import { matches } from '../data/matches';
import './Home.css';

const HeroScene = lazy(() => import('../components/HeroScene'));

const liveMatches = matches.filter(m => m.status === 'live');
const recentMatches = matches.filter(m => m.status === 'completed').slice(0, 4);

function FloatingParticles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <canvas ref={canvasRef} className="hero__particles" />;
}

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <FloatingParticles />
        <div className="hero__bg-gradient" />
        <div className="container hero__inner">
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero__badge">
              <Zap size={14} /> Welcome to CricPulse
            </div>
            <h1 className="hero__title">
              THE HEARTBEAT<br />
              <span className="hero__title-accent">OF CRICKET</span>
            </h1>
            <p className="hero__subtitle">
              Follow every run, wicket and moment with CricPulse.
            </p>
            <div className="hero__buttons">
              <Link to="/live" className="btn btn-primary btn-lg">
                <Zap size={18} /> Explore Live Matches
              </Link>
              <Link to="/matches" className="btn btn-secondary btn-lg">
                View Scorecards <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hero__3d"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="hero__scene-wrapper">
              <Suspense fallback={<div className="hero__scene-fallback">
                <div className="hero__fallback-ball">🏏</div>
              </div>}>
                <HeroScene />
              </Suspense>

              <motion.div
                className="hero__live-card glass-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="hero__live-header">
                  <div className="live-badge"><span className="live-dot" /> LIVE</div>
                </div>
                <div className="hero__live-teams">
                  <div className="hero__live-team">
                    <span className="hero__live-flag">🇮🇳</span>
                    <div>
                      <strong>INDIA</strong>
                      <div className="hero__live-score">185/4</div>
                    </div>
                  </div>
                  <span className="hero__live-vs">VS</span>
                  <div className="hero__live-team">
                    <span className="hero__live-flag">🇦🇺</span>
                    <div>
                      <strong>AUSTRALIA</strong>
                      <div className="hero__live-yettobat">Yet to Bat</div>
                    </div>
                  </div>
                </div>
                <div className="hero__live-overs">18.2 Overs</div>
                <div className="hero__live-req">Required: 16 runs from 10 balls</div>
              </motion.div>
            </div>

            <div className="hero__mini-stats">
              {[
                { value: '185', label: 'Runs', icon: TrendingUp },
                { value: '4', label: 'Wickets', icon: Trophy },
                { value: '18.2', label: 'Overs', icon: Zap },
                { value: '10.09', label: 'RR', icon: TrendingUp },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className="hero__mini-stat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                >
                  <StatCard value={s.value} label={s.label} icon={s.icon} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Live Matches</h2>
            <p className="section-subtitle">Experience the action as it happens.</p>
          </motion.div>
          <div className="home__matches-grid">
            {liveMatches.map((match, i) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <MatchCard match={match} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Recent Results</h2>
            <p className="section-subtitle">Check out the latest match results.</p>
          </motion.div>
          <div className="home__matches-grid">
            {recentMatches.map((match, i) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <MatchCard match={match} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home__cta">
        <div className="container">
          <motion.div
            className="home__cta-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="home__cta-content">
              <h2>Ready to dive deeper?</h2>
              <p>Explore statistics, points tables, and team details.</p>
              <div className="home__cta-buttons">
                <Link to="/statistics" className="btn btn-primary">
                  <TrendingUp size={16} /> View Statistics
                </Link>
                <Link to="/teams" className="btn btn-secondary">
                  <Users size={16} /> Browse Teams
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
