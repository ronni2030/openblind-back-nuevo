import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

// ==================== CONFIGURACIÓN API ====================
// IMPORTANTE: Cambiar esta IP por la tuya (ejecuta ipconfig para obtenerla)
const API_URL = 'http://192.168.18.54:8888';
const ID_CLIENTE = 1;

// ==================== CUSTOM HOOK: Comandos de Voz ====================
const useVoiceCommands = (onCommand) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'es-ES';
      
      recognitionInstance.onresult = (event) => {
        const speechResult = event.results[0][0].transcript.toLowerCase();
        setTranscript(speechResult);
        processCommand(speechResult);
      };
      
      recognitionInstance.onend = () => setIsListening(false);
      recognitionInstance.onerror = (event) => {
        console.error('Error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          alert('Por favor, permite el acceso al micrófono');
        }
      };
      
      setRecognition(recognitionInstance);
    }
    
    return () => {
      if (recognition) recognition.abort();
    };
  }, []);

  const processCommand = (command) => {
    console.log('🎤 Comando:', command);
    
    const commands = {
      'inicio': 'dashboard',
      'volver': 'dashboard',
      'lugares': 'lugares',
      'mis lugares': 'lugares',
      'contactos': 'contactos',
      'mis contactos': 'contactos',
      'rutas': 'rutas',
      'ubicación': 'ubicacion',
      'dónde estoy': 'ubicacion',
      'mi ubicación': 'ubicacion',
    };
    
    for (const [key, action] of Object.entries(commands)) {
      if (command.includes(key)) {
        if (onCommand) onCommand(action);
        speak(`Abriendo ${action === 'dashboard' ? 'inicio' : action}`);
        return;
      }
    }
    
    speak('Comando no reconocido');
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = useCallback(() => {
    if (recognition && isSupported) {
      try {
        setIsListening(true);
        setTranscript('');
        recognition.start();
        speak('Escuchando...');
      } catch (error) {
        console.error('Error:', error);
        setIsListening(false);
      }
    } else {
      alert('Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.');
    }
  }, [recognition, isSupported]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  return { isListening, transcript, isSupported, startListening, stopListening, speak };
};

// --- COMPONENTES VISUALES GLOBALES ---

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

// --- VISTA DASHBOARD CON COMANDOS DE VOZ ---
const Dashboard = ({ onChangeView, onVoiceCommand }) => {
  const modules = [
    { id: 'lugares', title: "Lugares Favoritos", icon: "bookmark", desc: "Tus sitios favoritos", color: "#b026ff" },
    { id: 'contactos', title: "Contactos de Emergencia", icon: "contacts", desc: "Llamada rápida", color: "#ffae00" },
    { id: 'ubicacion', title: "Mi Ubicación", icon: "my_location", desc: "¿Dónde estoy?", color: "#ff007f" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x < -threshold && activeIndex < modules.length - 1) setActiveIndex(activeIndex + 1);
    else if (info.offset.x > threshold && activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  return (
    <div className="mobile-container">
       <nav className="navbar">
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
           <span style={{fontSize:'1.8rem'}}>🪐</span>
           <span className="navbar-title">OpenBlind</span>
        </div>
        <AnimatedButton className="navbar-btn" onClick={() => onChangeView('login')}>
           <span className="material-icons-round">person</span>
        </AnimatedButton>
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
          style={{background: 'linear-gradient(90deg, #b026ff, #00d4ff)'}}
          animate={{ boxShadow: ["0 0 0 0px rgba(176, 38, 255, 0.7)", "0 0 0 20px rgba(176, 38, 255, 0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={onVoiceCommand}
         >
           <span className="material-icons-round">mic</span> COMANDO DE VOZ
         </motion.button>
      </div>
    </div>
  );
};

// --- VISTA LUGARES (con backend) ---
const LugaresView = ({ onBack }) => {
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({ id: null, title: '', subtitle: '', icon: 'place' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadLugares();
  }, []);

  const loadLugares = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/lugares-favoritos`);
      const data = await response.json();
      if (data.success && data.data) {
        const mappedLugares = data.data.map(l => ({
          id: l.id_lugar,
          title: l.nombre,
          subtitle: l.direccion,
          icon: l.icono
        }));
        setLugares(mappedLugares);
      } else {
        setError('Error al cargar lugares favoritos');
      }
    } catch (err) {
      console.error(err);
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (item = null) => {
    setCurrentItem(item || { id: null, title: '', subtitle: '', icon: 'place' });
    setIsEditOpen(true);
  };

  const handleSave = async () => {
    if (!currentItem.title || !currentItem.subtitle) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      setSaving(true);
      if (currentItem.id) {
        const response = await fetch(`${API_URL}/lugares-favoritos/${currentItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: currentItem.title,
            direccion: currentItem.subtitle,
            icono: currentItem.icon
          }),
        });
        const data = await response.json();
        if (data.success) {
          setLugares(lugares.map(l => l.id === currentItem.id ? currentItem : l));
          setIsEditOpen(false);
        } else {
          alert('Error al actualizar lugar');
        }
      } else {
        const response = await fetch(`${API_URL}/lugares-favoritos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: currentItem.title,
            direccion: currentItem.subtitle,
            icono: currentItem.icon
          }),
        });
        const data = await response.json();
        if (data.success && data.data) {
          const newLugar = {
            id: data.data.id_lugar,
            title: data.data.nombre,
            subtitle: data.data.direccion,
            icon: data.data.icono
          };
          setLugares([...lugares, newLugar]);
          setIsEditOpen(false);
        } else {
          alert('Error al crear lugar');
        }
      }
    } catch (err) {
      console.error(err);
      alert('No se pudo guardar el lugar');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setSaving(true);
      const response = await fetch(`${API_URL}/lugares-favoritos/${currentItem.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.success) {
        setLugares(lugares.filter(l => l.id !== currentItem.id));
        setIsDeleteOpen(false);
      } else {
        alert('Error al eliminar lugar');
      }
    } catch (err) {
      console.error(err);
      alert('No se pudo eliminar el lugar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mobile-container">
      <Header title="Mis Lugares" onBack={onBack} />
      <div className="view-content">
        {loading ? (
          <div style={{textAlign:'center', padding:'2rem', color:'rgba(255,255,255,0.7)'}}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{display:'inline-block'}}>
              <span className="material-icons-round" style={{fontSize:'3rem'}}>sync</span>
            </motion.div>
            <p style={{marginTop:'1rem'}}>Cargando lugares...</p>
          </div>
        ) : error ? (
          <div style={{textAlign:'center', padding:'2rem', color:'#ff007f'}}>
            <span className="material-icons-round" style={{fontSize:'3rem'}}>error_outline</span>
            <p style={{marginTop:'1rem'}}>{error}</p>
            <button className="btn-modal btn-confirm" onClick={loadLugares} style={{marginTop:'1rem'}}>Reintentar</button>
          </div>
        ) : lugares.length === 0 ? (
          <div style={{textAlign:'center', padding:'2rem', color:'rgba(255,255,255,0.5)'}}>
            <span className="material-icons-round" style={{fontSize:'3rem'}}>bookmark</span>
            <p style={{marginTop:'1rem'}}>No hay lugares guardados</p>
            <p style={{fontSize:'0.9rem', marginTop:'0.5rem'}}>Presiona + para agregar uno</p>
          </div>
        ) : (
          <AnimatePresence>
            {lugares.map((lugar, i) => (
              <motion.div key={lugar.id} className="premium-card" layout initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.1 }}>
                <div className="avatar-circle"><span className="material-icons-round">{lugar.icon}</span></div>
                <div className="info-container">
                  <h4 className="info-title">{lugar.title}</h4>
                  <p className="info-subtitle"><span className="material-icons-round" style={{fontSize:14}}>place</span> {lugar.subtitle}</p>
                </div>
                <div className="action-buttons">
                  <AnimatedButton className="action-btn-mini" onClick={() => openEditModal(lugar)}><span className="material-icons-round">edit</span></AnimatedButton>
                  <AnimatedButton className="action-btn-mini delete" onClick={() => { setCurrentItem(lugar); setIsDeleteOpen(true); }}><span className="material-icons-round">delete_outline</span></AnimatedButton>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        <div className="fab-container"><AnimatedButton className="btn-fab" onClick={() => openEditModal()}><span className="material-icons-round">add</span> Nuevo</AnimatedButton></div>
      </div>

      <Modal isOpen={isEditOpen} onClose={() => !saving && setIsEditOpen(false)} title={currentItem.id ? "Editar Lugar" : "Nuevo Lugar"}>
        <div className="form-group"><label className="form-label">Nombre</label><input className="form-input" value={currentItem.title} onChange={(e) => setCurrentItem({...currentItem, title: e.target.value})} placeholder="Ej. Casa" disabled={saving} /></div>
        <div className="form-group"><label className="form-label">Dirección</label><input className="form-input" value={currentItem.subtitle} onChange={(e) => setCurrentItem({...currentItem, subtitle: e.target.value})} placeholder="Ej. Av. Amazonas" disabled={saving} /></div>
        <div className="modal-actions"><button className="btn-modal btn-cancel" onClick={() => setIsEditOpen(false)} disabled={saving}>Cancelar</button><button className="btn-modal btn-confirm" onClick={handleSave} disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button></div>
      </Modal>
      <Modal isOpen={isDeleteOpen} onClose={() => !saving && setIsDeleteOpen(false)} title="Eliminar" type="danger">
        <div style={{textAlign:'center', padding: '1rem'}}>¿Borrar <strong>{currentItem.title}</strong>?</div>
        <div className="modal-actions"><button className="btn-modal btn-cancel" onClick={() => setIsDeleteOpen(false)} disabled={saving}>Cancelar</button><button className="btn-modal btn-delete" onClick={handleDelete} disabled={saving}>{saving ? 'Eliminando...' : 'Borrar'}</button></div>
      </Modal>
    </div>
  );
};

// --- VISTA CONTACTOS (con backend) ---
const ContactosView = ({ onBack }) => {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({ id: null, name: '', phone: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContactos();
  }, []);

  const loadContactos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/contactos`);
      const data = await response.json();
      if (data.success && data.data) {
        const mappedContactos = data.data.map(c => ({
          id: c.id_contacto,
          name: c.nombre,
          phone: c.telefono
        }));
        setContactos(mappedContactos);
      } else {
        setError('Error al cargar contactos');
      }
    } catch (err) {
      console.error(err);
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (c = null) => {
    setCurrentContact(c || { id: null, name: '', phone: '' });
    setIsEditOpen(true);
  };

  const handleSave = async () => {
    if (!currentContact.name || !currentContact.phone) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      setSaving(true);
      if (currentContact.id) {
        const response = await fetch(`${API_URL}/contactos/${currentContact.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: currentContact.name,
            telefono: currentContact.phone
          }),
        });
        const data = await response.json();
        if (data.success) {
          setContactos(contactos.map(c => c.id === currentContact.id ? currentContact : c));
          setIsEditOpen(false);
        } else {
          alert('Error al actualizar contacto');
        }
      } else {
        const response = await fetch(`${API_URL}/contactos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: currentContact.name,
            telefono: currentContact.phone
          }),
        });
        const data = await response.json();
        if (data.success && data.data) {
          const newContact = {
            id: data.data.id_contacto,
            name: data.data.nombre,
            phone: data.data.telefono
          };
          setContactos([...contactos, newContact]);
          setIsEditOpen(false);
        } else {
          alert('Error al crear contacto');
        }
      }
    } catch (err) {
      console.error(err);
      alert('No se pudo guardar el contacto');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setSaving(true);
      const response = await fetch(`${API_URL}/contactos/${currentContact.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.success) {
        setContactos(contactos.filter(c => c.id !== currentContact.id));
        setIsDeleteOpen(false);
      } else {
        alert('Error al eliminar contacto');
      }
    } catch (err) {
      console.error(err);
      alert('No se pudo eliminar el contacto');
    } finally {
      setSaving(false);
    }
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="mobile-container">
      <Header title="Contactos" onBack={onBack} />
      <div className="view-content">
        {loading ? (
          <div style={{textAlign:'center', padding:'2rem', color:'rgba(255,255,255,0.7)'}}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{display:'inline-block'}}>
              <span className="material-icons-round" style={{fontSize:'3rem'}}>sync</span>
            </motion.div>
            <p style={{marginTop:'1rem'}}>Cargando contactos...</p>
          </div>
        ) : error ? (
          <div style={{textAlign:'center', padding:'2rem', color:'#ff007f'}}>
            <span className="material-icons-round" style={{fontSize:'3rem'}}>error_outline</span>
            <p style={{marginTop:'1rem'}}>{error}</p>
            <button className="btn-modal btn-confirm" onClick={loadContactos} style={{marginTop:'1rem'}}>Reintentar</button>
          </div>
        ) : contactos.length === 0 ? (
          <div style={{textAlign:'center', padding:'2rem', color:'rgba(255,255,255,0.5)'}}>
            <span className="material-icons-round" style={{fontSize:'3rem'}}>contact_phone</span>
            <p style={{marginTop:'1rem'}}>No hay contactos guardados</p>
            <p style={{fontSize:'0.9rem', marginTop:'0.5rem'}}>Presiona + para agregar uno</p>
          </div>
        ) : (
          <AnimatePresence>
            {contactos.map((contact, i) => (
              <motion.div key={contact.id} className="premium-card" layout initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ delay: i * 0.1 }}>
                <div className="avatar-circle" style={{background:'linear-gradient(135deg, #ffae00, #ff007f)'}}>{contact.name.charAt(0).toUpperCase()}</div>
                <div className="info-container">
                  <h4 className="info-title">{contact.name}</h4>
                  <p className="info-subtitle"><span className="material-icons-round" style={{fontSize:14}}>phone</span> {contact.phone}</p>
                </div>
                <div className="action-buttons">
                  <motion.button className="action-btn-mini call" onClick={() => handleCall(contact.phone)} animate={{scale:[1,1.1,1]}} transition={{repeat:Infinity, duration:1.5}}><span className="material-icons-round">call</span></motion.button>
                  <AnimatedButton className="action-btn-mini" onClick={() => openEditModal(contact)}><span className="material-icons-round">edit</span></AnimatedButton>
                  <AnimatedButton className="action-btn-mini delete" onClick={() => { setCurrentContact(contact); setIsDeleteOpen(true); }}><span className="material-icons-round">delete_outline</span></AnimatedButton>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        <div className="fab-container"><AnimatedButton className="btn-fab" onClick={() => openEditModal()}><span className="material-icons-round">person_add</span> Nuevo</AnimatedButton></div>
      </div>

      <Modal isOpen={isEditOpen} onClose={() => !saving && setIsEditOpen(false)} title={currentContact.id ? "Editar Contacto" : "Nuevo Contacto"}>
        <div className="form-group"><label className="form-label">Nombre</label><input className="form-input" value={currentContact.name} onChange={(e) => setCurrentContact({...currentContact, name: e.target.value})} placeholder="Ej. Juan Pérez" disabled={saving} /></div>
        <div className="form-group"><label className="form-label">Teléfono</label><input className="form-input" type="tel" value={currentContact.phone} onChange={(e) => setCurrentContact({...currentContact, phone: e.target.value})} placeholder="099 123 4567" disabled={saving} /></div>
        <div className="modal-actions"><button className="btn-modal btn-cancel" onClick={() => setIsEditOpen(false)} disabled={saving}>Cancelar</button><button className="btn-modal btn-confirm" onClick={handleSave} disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button></div>
      </Modal>
      <Modal isOpen={isDeleteOpen} onClose={() => !saving && setIsDeleteOpen(false)} title="Eliminar Contacto" type="danger">
        <div style={{textAlign:'center', padding: '1rem'}}>¿Estás seguro de eliminar a <strong>{currentContact.name}</strong>?</div>
        <div className="modal-actions"><button className="btn-modal btn-cancel" onClick={() => setIsDeleteOpen(false)} disabled={saving}>Cancelar</button><button className="btn-modal btn-delete" onClick={handleDelete} disabled={saving}>{saving ? 'Eliminando...' : 'Eliminar'}</button></div>
      </Modal>
    </div>
  );
};

// --- VISTA UBICACIÓN ACTUAL ---
const UbicacionView = ({ onBack }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('Obteniendo dirección...');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Tu navegador no soporta geolocalización');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({
          lat: latitude,
          lng: longitude,
          accuracy: Math.round(accuracy),
          timestamp: new Date(position.timestamp)
        });
        getAddressFromCoords(latitude, longitude);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        switch(err.code) {
          case err.PERMISSION_DENIED:
            setError('Permiso denegado. Permite el acceso a tu ubicación.');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Ubicación no disponible. Verifica tu GPS.');
            break;
          case err.TIMEOUT:
            setError('Tiempo de espera agotado. Intenta de nuevo.');
            break;
          default:
            setError('Error desconocido al obtener ubicación.');
        }
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`,
        { headers: { 'User-Agent': 'OpenBlind-App' } }
      );
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress('No se pudo obtener la dirección');
      }
    } catch (err) {
      console.error(err);
      setAddress('Error al obtener dirección');
    }
  };

  const openInMaps = () => {
    if (location) {
      window.open(`https://www.google.com/maps?q=${location.lat},${location.lng}`, '_blank');
    }
  };

  const copyCoordinates = () => {
    if (location) {
      navigator.clipboard.writeText(`${location.lat}, ${location.lng}`);
      alert('Coordenadas copiadas');
    }
  };

  return (
    <div className="mobile-container">
      <Header title="Mi Ubicación" onBack={onBack} />
      <div className="view-content">
        {loading ? (
          <div style={{textAlign:'center', padding:'2rem', color:'rgba(255,255,255,0.7)'}}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{display:'inline-block'}}>
              <span className="material-icons-round" style={{fontSize:'3rem'}}>my_location</span>
            </motion.div>
            <p style={{marginTop:'1rem'}}>Obteniendo ubicación...</p>
          </div>
        ) : error ? (
          <div style={{textAlign:'center', padding:'2rem', color:'#ff007f'}}>
            <span className="material-icons-round" style={{fontSize:'3rem'}}>location_off</span>
            <p style={{marginTop:'1rem'}}>{error}</p>
            <button className="btn-modal btn-confirm" onClick={getLocation} style={{marginTop:'1rem'}}>Reintentar</button>
          </div>
        ) : location ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{padding:'1rem'}}>
            <div style={{background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius:'20px', padding:'2rem', textAlign:'center', marginBottom:'1.5rem', boxShadow:'0 10px 40px rgba(0,0,0,0.3)'}}>
              <motion.div animate={{scale:[1,1.1,1]}} transition={{duration:2, repeat:Infinity}}>
                <span className="material-icons-round" style={{fontSize:'4rem', color:'white'}}>location_on</span>
              </motion.div>
              <h3 style={{color:'white', marginTop:'1rem'}}>Ubicación Actual</h3>
            </div>

            <div className="premium-card" style={{marginBottom:'1rem'}}>
              <div style={{width:'100%'}}>
                <h4 className="info-title" style={{marginBottom:'0.5rem'}}>
                  <span className="material-icons-round" style={{fontSize:20, verticalAlign:'middle', marginRight:'0.5rem'}}>place</span>
                  Dirección
                </h4>
                <p style={{fontSize:'0.9rem', opacity:0.8, lineHeight:'1.5'}}>{address}</p>
              </div>
            </div>

            <div className="premium-card" style={{marginBottom:'1rem'}}>
              <div style={{width:'100%'}}>
                <h4 className="info-title" style={{marginBottom:'0.5rem'}}>
                  <span className="material-icons-round" style={{fontSize:20, verticalAlign:'middle', marginRight:'0.5rem'}}>gps_fixed</span>
                  Coordenadas GPS
                </h4>
                <div style={{display:'flex', gap:'1rem', flexWrap:'wrap', marginTop:'0.5rem'}}>
                  <div>
                    <p style={{fontSize:'0.75rem', opacity:0.6}}>Latitud</p>
                    <p style={{fontSize:'1rem', fontWeight:'bold', color:'#00d4ff'}}>{location.lat.toFixed(6)}°</p>
                  </div>
                  <div>
                    <p style={{fontSize:'0.75rem', opacity:0.6}}>Longitud</p>
                    <p style={{fontSize:'1rem', fontWeight:'bold', color:'#ff007f'}}>{location.lng.toFixed(6)}°</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="premium-card" style={{marginBottom:'1.5rem'}}>
              <div style={{width:'100%'}}>
                <h4 className="info-title" style={{marginBottom:'0.5rem'}}>
                  <span className="material-icons-round" style={{fontSize:20, verticalAlign:'middle', marginRight:'0.5rem'}}>adjust</span>
                  Precisión
                </h4>
                <p style={{fontSize:'1.2rem', fontWeight:'bold', color:'#b026ff'}}>±{location.accuracy} metros</p>
                <p style={{fontSize:'0.75rem', opacity:0.6, marginTop:'0.25rem'}}>Última actualización: {location.timestamp.toLocaleTimeString()}</p>
              </div>
            </div>

            <div style={{display:'flex', gap:'1rem', flexWrap:'wrap'}}>
              <AnimatedButton className="btn-fab" onClick={openInMaps} style={{flex:1, minWidth:'45%'}}>
                <span className="material-icons-round">map</span> Ver en Mapa
              </AnimatedButton>
              <AnimatedButton className="btn-fab" onClick={copyCoordinates} style={{flex:1, minWidth:'45%', background:'linear-gradient(90deg, #00d4ff, #b026ff)'}}>
                <span className="material-icons-round">content_copy</span> Copiar
              </AnimatedButton>
            </div>

            <div style={{marginTop:'1rem'}}>
              <AnimatedButton className="btn-fab" onClick={getLocation} style={{width:'100%', background:'linear-gradient(90deg, #667eea, #764ba2)'}}>
                <span className="material-icons-round">refresh</span> Actualizar
              </AnimatedButton>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

// --- PLACEHOLDER VIEW ---
const PlaceholderView = ({ title, icon, color, onBack }) => (
    <div className="mobile-container">
        <Header title={title} onBack={onBack} />
        <div style={{height:'80%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color: 'rgba(255,255,255,0.5)'}}>
            <span className="material-icons-round" style={{fontSize:'5rem', color: color, marginBottom:'1rem'}}>{icon}</span>
            <p>Próximamente...</p>
        </div>
    </div>
);

// --- APP PRINCIPAL ---
function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [showSplash, setShowSplash] = useState(true);

  // Comandos de voz
  const { isListening, startListening, stopListening } = useVoiceCommands((action) => {
    if (action === 'dashboard') {
      setCurrentView('dashboard');
    } else if (['lugares', 'contactos', 'rutas', 'ubicacion'].includes(action)) {
      setCurrentView(action);
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <motion.div className="splash-screen" exit={{ opacity: 0 }}>
        <StarBackground />
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1.5, rotate: 360 }} transition={{ duration: 0.8 }} style={{ fontSize: '4rem', zIndex: 20 }}>🪐</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ color: 'white', marginTop: '1rem', zIndex: 20, fontWeight: 800, letterSpacing: '2px' }}>OpenBlind</motion.h1>
      </motion.div>
    );
  }

  return (
    <>
      <StarBackground />
      
      {/* Indicador de voz activa */}
      {isListening && (
        <motion.div 
          className="voice-listening-indicator"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <span className="material-icons-round" style={{fontSize:'3rem', color:'white'}}>mic</span>
        </motion.div>
      )}
      
      <AnimatePresence mode='wait'>
        {currentView === 'dashboard' && <motion.div key="dash" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><Dashboard onChangeView={setCurrentView} onVoiceCommand={startListening} /></motion.div>}
        {currentView === 'lugares' && <motion.div key="lugares" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><LugaresView onBack={() => setCurrentView('dashboard')} /></motion.div>}
        {currentView === 'contactos' && <motion.div key="contactos" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><ContactosView onBack={() => setCurrentView('dashboard')} /></motion.div>}
        {currentView === 'rutas' && <motion.div key="rutas" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><PlaceholderView title="Rutas" icon="route" color="#00d4ff" onBack={() => setCurrentView('dashboard')} /></motion.div>}
        {currentView === 'ubicacion' && <motion.div key="ubicacion" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><UbicacionView onBack={() => setCurrentView('dashboard')} /></motion.div>}
        {currentView === 'login' && <motion.div key="login" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><PlaceholderView title="Login" icon="lock" color="#b026ff" onBack={() => setCurrentView('dashboard')} /></motion.div>}
      </AnimatePresence>
    </>
  );
}

export default App;