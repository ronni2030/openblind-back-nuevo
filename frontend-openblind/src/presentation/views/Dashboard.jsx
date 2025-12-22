import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useVoiceCommands from '../../application/hooks/useVoiceCommands';
import { speak } from '../../application/utils/speechUtils';
import { obtenerUbicacionActual } from '../../application/utils/geoUtils';

/**
 * Vista principal - Dashboard con carrusel de módulos
 */
export const Dashboard = ({ onChangeView }) => {
  const modules = [
    { id: 'lugares', title: "Lugares Favoritos", icon: "bookmark", desc: "Tus sitios favoritos", color: "#9b59d6" },
    { id: 'contactos', title: "Contactos de Emergencia", icon: "contacts", desc: "Llamada rápida", color: "#c471ed" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x < -threshold && activeIndex < modules.length - 1) setActiveIndex(activeIndex + 1);
    else if (info.offset.x > threshold && activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const handleVoiceCommand = async (command) => {
    if (command.includes('lugares') || command.includes('favoritos')) {
      speak('Abriendo lugares favoritos');
      onChangeView('lugares');
    } else if (command.includes('contactos') || command.includes('emergencia')) {
      speak('Abriendo contactos de emergencia');
      onChangeView('contactos');
    } else if (command.includes('dónde estoy') || command.includes('dónde me encuentro') || command.includes('ubicación')) {
      try {
        speak('Obteniendo tu ubicación');
        const coords = await obtenerUbicacionActual();
        speak(`Te encuentras en latitud ${coords.lat.toFixed(4)}, longitud ${coords.lng.toFixed(4)}`);
      } catch (error) {
        speak('No pude obtener tu ubicación');
      }
    }
  };

  const { isListening, toggleListening } = useVoiceCommands(handleVoiceCommand);

  return (
    <div className="mobile-container">
       <nav className="navbar">
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
           <span style={{fontSize:'1.8rem'}}>👁️</span>
           <span className="navbar-title">OpenBlind</span>
        </div>
      </nav>

      <div className="carousel-container">
        <div className="carousel-track">
          <AnimatePresence>
            {modules.map((module, index) => {
              let position = index - activeIndex;
              if (Math.abs(position) > 1) return null;

              return (
                <motion.div
                  key={module.id}
                  className="swipe-card"
                  drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={handleDragEnd}
                  onClick={() => position === 0 && onChangeView(module.id)}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    x: position * 320,
                    scale: position === 0 ? 1 : 0.85,
                    opacity: position === 0 ? 1 : 0.4,
                    zIndex: position === 0 ? 10 : 5,
                    rotateY: position * -10
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ borderColor: position === 0 ? module.color : 'transparent', boxShadow: position === 0 ? `0 0 30px ${module.color}44` : 'none' }}
                >
                  <span className="material-icons-round card-icon-large" style={{color: module.color}}>{module.icon}</span>
                  <h2 className="card-title-large">{module.title}</h2>
                  <p className="card-desc-large">{module.desc}</p>
                  {position === 0 && (
                     <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}} style={{marginTop:'2rem', background:'rgba(255,255,255,0.1)', padding:'0.5rem 1rem', borderRadius:'20px', fontSize:'0.8rem', letterSpacing:'1px'}}>
                        TOCA PARA ABRIR
                     </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div className="indicators">
          {modules.map((_, idx) => <div key={idx} className={`dot ${idx === activeIndex ? 'active' : ''}`} />)}
        </div>
      </div>

      <div style={{padding:'0 2rem 2rem'}}>
         <motion.button
          className="voice-main-btn"
          style={{background: isListening ? 'linear-gradient(90deg, #c471ed, #9b59d6)' : 'linear-gradient(90deg, #9b59d6, #c471ed)'}}
          animate={{ boxShadow: isListening ? ["0 0 0 0px rgba(196, 113, 237, 0.7)", "0 0 0 20px rgba(196, 113, 237, 0)"] : "0 0 0 0px" }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={toggleListening}
         >
           <span className="material-icons-round">mic</span> {isListening ? 'ESCUCHANDO...' : 'COMANDO DE VOZ'}
         </motion.button>
      </div>
    </div>
  );
};
