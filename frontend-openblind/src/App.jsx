import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './presentation/styles/index.css';

// Importar componentes
import StarBackground from './presentation/components/StarBackground';

// Importar vistas
import { Dashboard } from './presentation/views/Dashboard';
import { LugaresView } from './presentation/views/LugaresView';
import { ContactosView } from './presentation/views/ContactosView';

// Importar utilidades
import { speak } from './application/utils/speechUtils';

/**
 * Componente principal de la aplicación OpenBlind
 * Gestiona la navegación entre vistas y el splash screen inicial
 */
function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [showSplash, setShowSplash] = useState(true);
  const [audioActivated, setAudioActivated] = useState(false);

  useEffect(() => {
    // Cerrar splash automáticamente después de 2 segundos
    const timer = setTimeout(() => {
      setShowSplash(false);
      // Intentar activar el audio automáticamente
      try {
        speak('Bienvenido a OpenBlind, tu asistente de accesibilidad');
        setAudioActivated(true);
      } catch (e) {
        console.log('Audio bloqueado por navegador, se activará con primer comando');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <motion.div className="splash-screen" exit={{ opacity: 0 }}>
        <StarBackground />
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1.5, rotate: 360 }} transition={{ duration: 0.8 }} style={{ fontSize: '4rem', zIndex: 20 }}>👁️</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ color: 'white', marginTop: '1rem', zIndex: 20, fontWeight: 800, letterSpacing: '2px' }}>OpenBlind</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ color: '#c471ed', marginTop: '0.5rem', zIndex: 20 }}>Accesibilidad para todos</motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ marginTop: '2rem', color: '#9b59d6', fontSize: '0.9rem' }}
        >
          Iniciando comandos de voz...
        </motion.div>
      </motion.div>
    );
  }

  return (
    <>
      <StarBackground />
      <AnimatePresence mode='wait'>
        {currentView === 'dashboard' && <motion.div key="dash" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><Dashboard onChangeView={setCurrentView} /></motion.div>}
        {currentView === 'lugares' && <motion.div key="lugares" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><LugaresView onBack={() => setCurrentView('dashboard')} /></motion.div>}
        {currentView === 'contactos' && <motion.div key="contactos" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><ContactosView onBack={() => setCurrentView('dashboard')} /></motion.div>}
      </AnimatePresence>
    </>
  );
}

export default App;
