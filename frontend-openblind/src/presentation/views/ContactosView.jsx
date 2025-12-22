import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { AnimatedButton } from '../components/AnimatedButton';
import { Modal } from '../components/Modal';
import useVoiceCommands from '../../application/hooks/useVoiceCommands';
import { speak } from '../../application/utils/speechUtils';
import { extraerContacto } from '../../application/utils/voiceCommandsParser';

// Configuración API
const API_URL = 'http://192.168.18.54:8888';
const ID_CLIENTE = 1;

/**
 * Vista de Contactos de Emergencia con comandos de voz inteligentes
 */
export const ContactosView = ({ onBack }) => {
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
