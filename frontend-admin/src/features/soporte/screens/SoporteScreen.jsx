/**
 * Soporte Screen - Gestión de Tickets de Soporte (Read, Update, Delete)
 *
 * @author MALDONADO DELGADO DAVID ALEJANDRO (N°5)
 */

import { useState, useEffect } from 'react';
import { Card, Button, Badge } from '@shared/components';
import { getTickets, updateTicket, deleteTicket } from '@services/api';
import './SoporteScreen.css';

export default function SoporteScreen() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const response = await getTickets();
      if (response.success) {
        setTickets(response.data || []);
      } else {
        console.error('Error al cargar tickets:', response.message);
        alert('Error al cargar los tickets de soporte del servidor');
      }
    } catch (error) {
      console.error('Error de conexión al cargar tickets:', error);
      alert('No se pudo conectar con el servidor. Verifica que esté corriendo en http://localhost:8888');
    }
  };

  const handleUpdateEstado = async (id, nuevoEstado) => {
    try {
      const response = await updateTicket(id, { estado: nuevoEstado });
      if (response.success) {
        alert('✅ Estado del ticket actualizado correctamente en la base de datos');
        await loadTickets();
      } else {
        alert('❌ Error: ' + (response.message || 'No se pudo actualizar el estado'));
      }
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      alert('❌ Error de conexión con el servidor');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('¿Archivar este ticket?')) {
      try {
        const response = await deleteTicket(id);
        if (response.success) {
          alert('✅ Ticket archivado correctamente en la base de datos');
          await loadTickets();
        } else {
          alert('❌ Error: ' + (response.message || 'No se pudo archivar el ticket'));
        }
      } catch (error) {
        console.error('Error al archivar ticket:', error);
        alert('❌ Error de conexión con el servidor');
      }
    }
  };

  const getPrioridadBadge = (prioridad) => {
    const variants = {
      'baja': 'info',
      'media': 'warning',
      'alta': 'danger',
    };
    return variants[prioridad] || 'neutral';
  };

  const getEstadoBadge = (estado) => {
    const variants = {
      'pendiente': 'warning',
      'en_proceso': 'info',
      'resuelto': 'success',
      'cerrado': 'neutral',
    };
    return variants[estado] || 'neutral';
  };

  return (
    <div className="soporte">
      <div className="page-header">
        <div>
          <h1>Gestión de Soporte</h1>
          <p>Tickets de soporte enviados por los usuarios</p>
        </div>
      </div>

      <Card>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Asunto</th>
                <th>Usuario</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>#{ticket.id}</td>
                  <td>{ticket.asunto}</td>
                  <td>{ticket.usuario}</td>
                  <td><Badge variant={getPrioridadBadge(ticket.prioridad)} size="sm">{ticket.prioridad}</Badge></td>
                  <td><Badge variant={getEstadoBadge(ticket.estado)} size="sm">{ticket.estado.replace('_', ' ')}</Badge></td>
                  <td>{ticket.fecha}</td>
                  <td className="actions">
                    <button className="btn-icon" onClick={() => setSelectedTicket(ticket)} title="Ver detalles">👁️</button>
                    <select
                      className="select-estado"
                      value={ticket.estado}
                      onChange={(e) => handleUpdateEstado(ticket.id, e.target.value)}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en_proceso">En Proceso</option>
                      <option value="resuelto">Resuelto</option>
                      <option value="cerrado">Cerrado</option>
                    </select>
                    <button className="btn-icon" onClick={() => handleDelete(ticket.id)} title="Archivar">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal de Detalles del Ticket */}
      {selectedTicket && (
        <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalles del Ticket #{selectedTicket.id}</h2>
              <button className="modal-close" onClick={() => setSelectedTicket(null)}>×</button>
            </div>
            <div className="ticket-details">
              <div className="detail-row">
                <strong>Asunto:</strong>
                <p>{selectedTicket.asunto}</p>
              </div>
              <div className="detail-row">
                <strong>Usuario:</strong>
                <p>{selectedTicket.usuario}</p>
              </div>
              <div className="detail-row">
                <strong>Descripción:</strong>
                <p>{selectedTicket.descripcion || 'Sin descripción'}</p>
              </div>
              <div className="detail-row">
                <strong>Prioridad:</strong>
                <Badge variant={getPrioridadBadge(selectedTicket.prioridad)}>{selectedTicket.prioridad}</Badge>
              </div>
              <div className="detail-row">
                <strong>Estado:</strong>
                <Badge variant={getEstadoBadge(selectedTicket.estado)}>{selectedTicket.estado.replace('_', ' ')}</Badge>
              </div>
              <div className="detail-row">
                <strong>Fecha:</strong>
                <p>{selectedTicket.fecha}</p>
              </div>
            </div>
            <div className="modal-actions">
              <Button variant="ghost" onClick={() => setSelectedTicket(null)}>Cerrar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
