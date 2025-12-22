import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { AnimatedButton } from '../components/AnimatedButton';
import { Modal } from '../components/Modal';
import useVoiceCommands from '../../application/hooks/useVoiceCommands';
import { speak } from '../../application/utils/speechUtils';
import { obtenerUbicacionActual, obtenerDireccionDeCoords } from '../../application/utils/geoUtils';
import { extraerLugar, esComandoNavegacion, extraerDestino } from '../../application/utils/voiceCommandsParser';

// Configuración API
const API_URL = 'http://192.168.18.54:8888';
const ID_CLIENTE = 1;

/**
 * Vista de Lugares Favoritos con comandos de voz inteligentes
 */
export const LugaresView = ({ onBack }) => {
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
      // Usar geo: scheme que funciona en Android
      const url = `geo:0,0?q=${lugar.latitud},${lugar.longitud}(${encodeURIComponent(lugar.nombreLugar)})`;
      window.location.href = url;
      speak(`Navegando a ${lugar.nombreLugar}`);
    } else {
      const url = `geo:0,0?q=${encodeURIComponent(lugar.direccion)}`;
      window.location.href = url;
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
          const direccion = await obtenerDireccionDeCoords(coords.lat, coords.lng);

          setCurrentItem({
            idLugarFavorito: null,
            nombreLugar: lugarInfo.nombre || 'Mi ubicación',
            direccion: direccion,
            latitud: coords.lat,
            longitud: coords.lng,
            icono: 'my_location'
          });
          setIsEditOpen(true);
          speak(`Ubicación obtenida: ${direccion}. Puedes cambiar el nombre o guardar directamente`);
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
