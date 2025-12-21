import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './presentation/styles/index.css';

// Configuración API - Para desarrollo local
// IMPORTANTE: Para APK móvil, cambiar localhost por tu IP local (ej: 192.168.1.5)
const API_URL = 'http://localhost:8888';
const ID_CLIENTE = 1;

// --- UTILIDADES PARA COMANDOS DE VOZ INTELIGENTES ---

// Extraer información de comandos naturales
const extraerContacto = (comando) => {
  // Ejemplo: "agrega a mi hija su número es 099-123-4567 su nombre es María"
  const patterns = {
    nombre: /(?:nombre es|se llama|llamado|llamada)\s+([a-záéíóúñ\s]+?)(?:\s+su|\s+número|$)/i,
    telefono: /(?:número es|teléfono es|su número|celular)\s*([0-9\-\s]+)/i,
    relacion: /(?:mi|a mi)\s+(mamá|papá|madre|padre|hijo|hija|hermano|hermana|esposo|esposa|tío|tía|primo|prima|abuelo|abuela)/i
  };

  const resultado = {};

  // Extraer nombre
  const matchNombre = comando.match(patterns.nombre);
  if (matchNombre) resultado.nombreContacto = matchNombre[1].trim();

  // Extraer teléfono
  const matchTelefono = comando.match(patterns.telefono);
  if (matchTelefono) resultado.telefono = matchTelefono[1].replace(/[\s\-]/g, '');

  // Extraer relación
  const matchRelacion = comando.match(patterns.relacion);
  if (matchRelacion) resultado.relacion = matchRelacion[1];

  return Object.keys(resultado).length > 0 ? resultado : null;
};

// Extraer lugar de comandos
const extraerLugar = (comando) => {
  const resultado = {};

  // Detectar si dice "donde estoy" / "ubicación actual" / "en la que estoy"
  if (/(?:donde estoy|ubicación actual|en la que estoy|ubicación en la que estoy|el lugar donde estoy|la ubicación donde estoy)/i.test(comando)) {
    resultado.usarGPS = true;
    resultado.nombreLugar = '';
    resultado.direccion = '';
    return resultado;
  }

  // Si NO es GPS, extraer nombre y dirección normales
  // Ejemplo: "agrega mi casa en Av. Amazonas"
  const matchNombre = comando.match(/(?:agrega|guardar|agregar|crear)\s+(?:mi\s+)?([a-záéíóúñ\s]+?)(?:\s+en|\s+ubicado|$)/i);
  if (matchNombre) {
    const nombre = matchNombre[1].trim();
    // Filtrar palabras que no son nombres de lugar
    if (!/(donde|ubicación|que estoy)/i.test(nombre)) {
      resultado.nombreLugar = nombre;
    }
  }

  const matchDireccion = comando.match(/(?:en|ubicado en|dirección)\s+([^,]+)/i);
  if (matchDireccion) resultado.direccion = matchDireccion[1].trim();

  return Object.keys(resultado).length > 0 ? resultado : null;
};

// Detectar comando de navegación
const esComandoNavegacion = (comando) => {
  return /(?:quiero ir|llévame|navegar|ir a|cómo llego)\s+(?:a\s+)?([a-záéíóúñ\s]+)/i.test(comando);
};

// Extraer destino
const extraerDestino = (comando) => {
  const match = comando.match(/(?:quiero ir|llévame|navegar|ir a|cómo llego)\s+(?:a\s+)?([a-záéíóúñ\s]+)/i);
  return match ? match[1].trim() : null;
};

// --- COMPONENTES VISUALES ---

const StarBackground = () => {
  const stars = new Array(30).fill(0).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: `${Math.random() * 3 + 2}s`,
    delay: `${Math.random() * 5}s`
  }));

  return (
    <div className="star-container">
      {stars.map((star) => (
        <div key={star.id} className="star" style={{ left: star.left, animationDuration: star.duration, animationDelay: star.delay }} />
      ))}
    </div>
  );
};

const Header = ({ title, onBack }) => (
  <div className="navbar">
    <button onClick={onBack} style={{background:'none', border:'none', color:'white', fontSize:'1.5rem', cursor:'pointer', display:'flex', alignItems:'center'}}>
      <span className="material-icons-round">arrow_back_ios</span>
    </button>
    <span className="navbar-title">{title}</span>
    <div style={{width: 24}}></div>
  </div>
);

const AnimatedButton = ({ onClick, className, children, style }) => (
  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={className} onClick={onClick} style={style}>
    {children}
  </motion.button>
);

const Modal = ({ isOpen, onClose, title, children, type }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
        <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
        >
          <div className={`modal-header ${type}`}><h3>{title}</h3></div>
          <div className="modal-body">{children}</div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// Hook de comandos de voz
const useVoiceCommands = (onCommand, autoStart = true) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [firstCommand, setFirstCommand] = useState(true);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech Recognition no disponible');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = 'es-ES';
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = false;

    recognitionInstance.onresult = (event) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.toLowerCase();
      console.log('🎤 Comando:', command);

      // Si es el primer comando, activar audio con mensaje de bienvenida
      if (firstCommand) {
        try {
          speak('Comando escuchado');
          setFirstCommand(false);
        } catch (e) {
          console.log('Audio se activará');
        }
      }

      onCommand(command);
    };

    recognitionInstance.onerror = (event) => {
      console.error('Error voz:', event.error);
      if (event.error !== 'no-speech') {
        setIsListening(false);
      }
    };

    recognitionInstance.onend = () => {
      if (isListening) {
        try {
          recognitionInstance.start();
        } catch (e) {
          console.error('Error reiniciando:', e);
        }
      }
    };

    setRecognition(recognitionInstance);

    // INICIAR AUTOMÁTICAMENTE si autoStart es true
    if (autoStart) {
      setTimeout(() => {
        try {
          recognitionInstance.start();
          setIsListening(true);
          console.log('✅ Comandos de voz ACTIVADOS automáticamente');
        } catch (e) {
          console.error('Error iniciando automáticamente:', e);
        }
      }, 500);
    }

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, [autoStart]);

  const toggleListening = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
        setIsListening(false);
        speak('Comandos de voz desactivados');
      } else {
        try {
          recognition.start();
          setIsListening(true);
          speak('Comandos de voz activados');
        } catch (e) {
          console.error('Error iniciando:', e);
        }
      }
    }
  };

  return { isListening, toggleListening };
};

// Síntesis de voz
const speak = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

// Obtener ubicación actual
const obtenerUbicacionActual = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocalización no disponible');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => reject(error.message)
    );
  });
};

// --- VISTA DASHBOARD ---
const Dashboard = ({ onChangeView }) => {
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

// --- VISTA LUGARES FAVORITOS CON VOZ INTELIGENTE ---
const LugaresView = ({ onBack }) => {
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({ idLugarFavorito: null, nombreLugar: '', direccion: '', latitud: null, longitud: null, icono: 'place' });

  useEffect(() => {
    fetchLugares();
  }, []);

  const fetchLugares = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/lugares-favoritos/cliente/${ID_CLIENTE}`);
      const data = await response.json();
      setLugares(data);
      speak(`Tienes ${data.length} lugares favoritos`);
    } catch (error) {
      console.error('Error:', error);
      speak('Error al cargar lugares');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (item = null) => {
    const newItem = item || { idLugarFavorito: null, nombreLugar: '', direccion: '', latitud: null, longitud: null, icono: 'place' };
    setCurrentItem(newItem);
    setIsEditOpen(true);
    speak(item ? `Editando ${item.nombreLugar}` : 'Nuevo lugar');
  };

  const handleSave = async () => {
    try {
      // Si no tiene coordenadas, obtener la actual
      let lat = currentItem.latitud;
      let lng = currentItem.longitud;

      if (!lat || !lng) {
        try {
          const coords = await obtenerUbicacionActual();
          lat = coords.lat;
          lng = coords.lng;
        } catch (error) {
          console.log('No se pudo obtener ubicación');
        }
      }

      if (currentItem.idLugarFavorito) {
        await fetch(`${API_URL}/lugares-favoritos/actualizar/${currentItem.idLugarFavorito}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombreLugar: currentItem.nombreLugar,
            direccion: currentItem.direccion,
            latitud: lat,
            longitud: lng,
            icono: currentItem.icono
          })
        });
        speak('Lugar actualizado');
      } else {
        await fetch(`${API_URL}/lugares-favoritos/crear`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idCliente: ID_CLIENTE,
            nombreLugar: currentItem.nombreLugar,
            direccion: currentItem.direccion,
            latitud: lat,
            longitud: lng,
            icono: currentItem.icono
          })
        });
        speak('Lugar creado');
      }
      setIsEditOpen(false);
      fetchLugares();
    } catch (error) {
      console.error('Error:', error);
      speak('Error al guardar');
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`${API_URL}/lugares-favoritos/eliminar/${currentItem.idLugarFavorito}`, {
        method: 'DELETE'
      });
      setIsDeleteOpen(false);
      fetchLugares();
      speak('Lugar eliminado');
    } catch (error) {
      console.error('Error:', error);
      speak('Error al eliminar');
    }
  };

  const navegarALugar = (lugar) => {
    if (lugar.latitud && lugar.longitud) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lugar.latitud},${lugar.longitud}`;
      window.open(url, '_blank');
      speak(`Navegando a ${lugar.nombreLugar}`);
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lugar.direccion)}`;
      window.open(url, '_blank');
      speak(`Buscando ${lugar.nombreLugar} en el mapa`);
    }
  };

  const handleVoiceCommand = async (command) => {
    // Comando: "agrega el lugar donde estoy" / "agrega la ubicación en la que estoy"
    if (command.includes('agrega') || command.includes('agregar') || command.includes('guardar')) {
      const lugarInfo = extraerLugar(command);

      if (lugarInfo && lugarInfo.usarGPS) {
        // USAR GPS AUTOMÁTICAMENTE
        try {
          speak('Obteniendo tu ubicación');
          const coords = await obtenerUbicacionActual();
          setCurrentItem({
            idLugarFavorito: null,
            nombreLugar: 'Mi ubicación',
            direccion: `Lat: ${coords.lat.toFixed(6)}, Lng: ${coords.lng.toFixed(6)}`,
            latitud: coords.lat,
            longitud: coords.lng,
            icono: 'my_location'
          });
          setIsEditOpen(true);
          speak('Ubicación obtenida. Ponle un nombre y guarda');
        } catch (error) {
          speak('No pude obtener tu ubicación. Asegúrate de dar permisos');
        }
      } else if (lugarInfo) {
        // Usar nombre y dirección del comando
        setCurrentItem({
          idLugarFavorito: null,
          nombreLugar: lugarInfo.nombreLugar || '',
          direccion: lugarInfo.direccion || '',
          latitud: null,
          longitud: null,
          icono: 'place'
        });
        setIsEditOpen(true);
        speak(`Agregando ${lugarInfo.nombreLugar || 'nuevo lugar'}. Completa los datos`);
      } else {
        openEditModal();
      }
    }
    // Comando: "quiero ir a casa" / "busca av amazonas"
    else if (esComandoNavegacion(command) || command.includes('busca') || command.includes('búscame')) {
      const destino = extraerDestino(command);
      const lugar = lugares.find(l => l.nombreLugar.toLowerCase().includes(destino.toLowerCase()));

      if (lugar) {
        // Lugar guardado - navegar con GPS
        navegarALugar(lugar);
      } else {
        // No está guardado - buscar en Google Maps
        const query = destino || command.replace(/(?:busca|búscame|quiero ir|navegar|ir a|llévame)/gi, '').trim();
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
        window.open(url, '_blank');
        speak(`Buscando ${query} en Google Maps`);
      }
    }
    // Comandos generales
    else if (command.includes('lista') || command.includes('muestra')) {
      if (lugares.length === 0) {
        speak('No tienes lugares guardados');
      } else {
        speak(`Tienes ${lugares.length} lugares: ${lugares.map(l => l.nombreLugar).join(', ')}`);
      }
    } else if (command.includes('volver') || command.includes('atrás') || command.includes('menú')) {
      speak('Volviendo al menú');
      onBack();
    } else if (command.includes('dónde estoy')) {
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

  if (loading) {
    return (
      <div className="mobile-container">
        <Header title="Lugares Favoritos" onBack={onBack} />
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'50vh', color:'white'}}>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container">
      <Header title="Lugares Favoritos" onBack={onBack} />
      <div className="view-content">
        <AnimatePresence>
          {lugares.map((lugar, i) => (
            <motion.div
              key={lugar.idLugarFavorito} className="premium-card" layout
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.1 }}
            >
              <div className="avatar-circle"><span className="material-icons-round">{lugar.icono || 'place'}</span></div>
              <div className="info-container">
                <h4 className="info-title">{lugar.nombreLugar}</h4>
                <p className="info-subtitle"><span className="material-icons-round" style={{fontSize:14}}>place</span> {lugar.direccion}</p>
              </div>
              <div className="action-buttons">
                 <AnimatedButton className="action-btn-mini" style={{background:'rgba(156, 39, 176, 0.2)', color:'#c471ed'}} onClick={() => navegarALugar(lugar)}><span className="material-icons-round">navigation</span></AnimatedButton>
                 <AnimatedButton className="action-btn-mini" onClick={() => openEditModal(lugar)}><span className="material-icons-round">edit</span></AnimatedButton>
                 <AnimatedButton className="action-btn-mini delete" onClick={() => { setCurrentItem(lugar); setIsDeleteOpen(true); speak(`¿Eliminar ${lugar.nombreLugar}?`); }}><span className="material-icons-round">delete_outline</span></AnimatedButton>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="fab-container">
          <AnimatedButton className="btn-fab" onClick={() => openEditModal()}>
            <span className="material-icons-round">add</span> Nuevo
          </AnimatedButton>
        </div>
        <div className="fab-container" style={{bottom: '6rem'}}>
          <motion.button
            className="btn-fab"
            style={{background: isListening ? '#c471ed' : '#9b59d6'}}
            onClick={toggleListening}
          >
            <span className="material-icons-round">mic</span>
          </motion.button>
        </div>
      </div>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title={currentItem.nombreLugar ? "Editar Lugar" : "Nuevo Lugar"}>
          <div className="form-group"><label className="form-label">Nombre</label><input className="form-input" value={currentItem.nombreLugar} onChange={(e)=>setCurrentItem({...currentItem, nombreLugar:e.target.value})} placeholder="Ej. Casa" /></div>
          <div className="form-group"><label className="form-label">Dirección</label><input className="form-input" value={currentItem.direccion} onChange={(e)=>setCurrentItem({...currentItem, direccion:e.target.value})} placeholder="Ej. Av. Amazonas" /></div>
          <div className="modal-actions"><button className="btn-modal btn-cancel" onClick={()=>setIsEditOpen(false)}>Cancelar</button><button className="btn-modal btn-confirm" onClick={handleSave}>Guardar</button></div>
      </Modal>
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Eliminar" type="danger">
         <div style={{textAlign:'center', padding: '1rem'}}>¿Borrar <strong>{currentItem.nombreLugar}</strong>?</div>
         <div className="modal-actions"><button className="btn-modal btn-cancel" onClick={()=>setIsDeleteOpen(false)}>Cancelar</button><button className="btn-modal btn-delete" onClick={handleDelete}>Borrar</button></div>
      </Modal>
    </div>
  );
};

// --- VISTA CONTACTOS CON VOZ INTELIGENTE ---
const ContactosView = ({ onBack }) => {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({ idContactoEmergencia: null, nombreContacto: '', telefono: '', relacion: '' });

  useEffect(() => {
    fetchContactos();
  }, []);

  const fetchContactos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/contactos-emergencia/cliente/${ID_CLIENTE}`);
      const data = await response.json();
      setContactos(data);
      speak(`Tienes ${data.length} contactos de emergencia`);
    } catch (error) {
      console.error('Error:', error);
      speak('Error al cargar contactos');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (c = null) => {
    const newContact = c || { idContactoEmergencia: null, nombreContacto: '', telefono: '', relacion: '' };
    setCurrentContact(newContact);
    setIsEditOpen(true);
    speak(c ? `Editando ${c.nombreContacto}` : 'Nuevo contacto');
  };

  const handleSave = async () => {
    try {
      if (currentContact.idContactoEmergencia) {
        await fetch(`${API_URL}/contactos-emergencia/actualizar/${currentContact.idContactoEmergencia}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombreContacto: currentContact.nombreContacto,
            telefono: currentContact.telefono,
            relacion: currentContact.relacion
          })
        });
        speak('Contacto actualizado');
      } else {
        await fetch(`${API_URL}/contactos-emergencia/crear`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idCliente: ID_CLIENTE,
            nombreContacto: currentContact.nombreContacto,
            telefono: currentContact.telefono,
            relacion: currentContact.relacion
          })
        });
        speak('Contacto creado');
      }
      setIsEditOpen(false);
      fetchContactos();
    } catch (error) {
      console.error('Error:', error);
      speak('Error al guardar');
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`${API_URL}/contactos-emergencia/eliminar/${currentContact.idContactoEmergencia}`, {
        method: 'DELETE'
      });
      setIsDeleteOpen(false);
      fetchContactos();
      speak('Contacto eliminado');
    } catch (error) {
      console.error('Error:', error);
      speak('Error al eliminar');
    }
  };

  const handleCall = (contact) => {
    speak(`Llamando a ${contact.nombreContacto}`);
    window.location.href = `tel:${contact.telefono}`;
  };

  const handleVoiceCommand = (command) => {
    // Comando: "agrega a mi [relación] su número es [teléfono] su nombre es [nombre]"
    if (command.includes('agrega') || command.includes('agregar') || command.includes('guardar')) {
      const contactoInfo = extraerContacto(command);
      if (contactoInfo) {
        setCurrentContact({
          idContactoEmergencia: null,
          nombreContacto: contactoInfo.nombreContacto || '',
          telefono: contactoInfo.telefono || '',
          relacion: contactoInfo.relacion || ''
        });
        setIsEditOpen(true);
        speak(`Agregando contacto ${contactoInfo.nombreContacto || ''}`);
      } else {
        openEditModal();
      }
    }
    // Comando: "llama a [nombre]" o "llamar a mi [relación]"
    else if (command.includes('llama') || command.includes('llamar')) {
      const palabras = command.split(' ');
      const indiceIndex = palabras.findIndex(p => p.includes('primero') || p.includes('segundo') || p.includes('tercero'));

      if (indiceIndex !== -1) {
        const indices = { 'primero': 0, 'segundo': 1, 'tercero': 2 };
        const palabra = palabras[indiceIndex];
        const index = Object.keys(indices).find(key => palabra.includes(key));
        if (index && contactos[indices[index]]) {
          handleCall(contactos[indices[index]]);
        }
      } else {
        const contacto = contactos.find(c =>
          command.includes(c.nombreContacto.toLowerCase()) ||
          (c.relacion && command.includes(c.relacion.toLowerCase()))
        );
        if (contacto) {
          handleCall(contacto);
        } else if (contactos.length > 0) {
          handleCall(contactos[0]);
        }
      }
    }
    // Comandos generales
    else if (command.includes('lista') || command.includes('contactos')) {
      speak(`Tienes ${contactos.length} contactos: ${contactos.map(c => c.nombreContacto).join(', ')}`);
    } else if (command.includes('volver') || command.includes('atrás')) {
      speak('Volviendo al menú');
      onBack();
    }
  };

  const { isListening, toggleListening } = useVoiceCommands(handleVoiceCommand);

  if (loading) {
    return (
      <div className="mobile-container">
        <Header title="Contactos de Emergencia" onBack={onBack} />
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'50vh', color:'white'}}>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container">
      <Header title="Contactos de Emergencia" onBack={onBack} />
      <div className="view-content">
        <AnimatePresence>
          {contactos.map((contact, i) => (
            <motion.div
              key={contact.idContactoEmergencia} className="premium-card" layout
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ delay: i * 0.1 }}
            >
              <div className="avatar-circle" style={{background:'linear-gradient(135deg, #c471ed, #9b59d6)'}}>{contact.nombreContacto.charAt(0).toUpperCase()}</div>
              <div className="info-container">
                <h4 className="info-title">{contact.nombreContacto}</h4>
                <p className="info-subtitle"><span className="material-icons-round" style={{fontSize:14}}>phone</span> {contact.telefono}</p>
                {contact.relacion && <p className="info-subtitle" style={{fontSize:'0.8rem', color:'#9b59d6'}}>{contact.relacion}</p>}
              </div>
              <div className="action-buttons">
                 <motion.button
                   className="action-btn-mini call"
                   animate={{scale:[1,1.1,1]}}
                   transition={{repeat:Infinity, duration:1.5}}
                   onClick={() => handleCall(contact)}
                 >
                   <span className="material-icons-round">call</span>
                 </motion.button>
                 <AnimatedButton className="action-btn-mini" onClick={() => openEditModal(contact)}><span className="material-icons-round">edit</span></AnimatedButton>
                 <AnimatedButton className="action-btn-mini delete" onClick={() => { setCurrentContact(contact); setIsDeleteOpen(true); speak(`¿Eliminar a ${contact.nombreContacto}?`); }}><span className="material-icons-round">delete_outline</span></AnimatedButton>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="fab-container">
          <AnimatedButton className="btn-fab" onClick={() => openEditModal()}>
            <span className="material-icons-round">person_add</span> Nuevo
          </AnimatedButton>
        </div>
        <div className="fab-container" style={{bottom: '6rem'}}>
          <motion.button
            className="btn-fab"
            style={{background: isListening ? '#c471ed' : '#9b59d6'}}
            onClick={toggleListening}
          >
            <span className="material-icons-round">mic</span>
          </motion.button>
        </div>
      </div>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title={currentContact.nombreContacto ? "Editar Contacto" : "Nuevo Contacto"}>
          <div className="form-group"><label className="form-label">Nombre</label><input className="form-input" value={currentContact.nombreContacto} onChange={(e)=>setCurrentContact({...currentContact, nombreContacto:e.target.value})} placeholder="Ej. María" /></div>
          <div className="form-group"><label className="form-label">Teléfono</label><input className="form-input" type="tel" value={currentContact.telefono} onChange={(e)=>setCurrentContact({...currentContact, telefono:e.target.value})} placeholder="099..." /></div>
          <div className="form-group"><label className="form-label">Relación (opcional)</label><input className="form-input" value={currentContact.relacion} onChange={(e)=>setCurrentContact({...currentContact, relacion:e.target.value})} placeholder="Ej. Hija, Mamá, etc." /></div>
          <div className="modal-actions"><button className="btn-modal btn-cancel" onClick={()=>setIsEditOpen(false)}>Cancelar</button><button className="btn-modal btn-confirm" onClick={handleSave}>Guardar</button></div>
      </Modal>
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Eliminar" type="danger">
         <div style={{textAlign:'center', padding: '1rem'}}>¿Borrar a <strong>{currentContact.nombreContacto}</strong>?</div>
         <div className="modal-actions"><button className="btn-modal btn-cancel" onClick={()=>setIsDeleteOpen(false)}>Cancelar</button><button className="btn-modal btn-delete" onClick={handleDelete}>Borrar</button></div>
      </Modal>
    </div>
  );
};

// --- APP PRINCIPAL ---
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
