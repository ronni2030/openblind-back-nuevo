/**
 * Soporte Screen - Gestión de Tickets de Soporte (Read, Update, Delete)
 *
 * @author MALDONADO DELGADO DAVID ALEJANDRO (N°5)
 */

import { useState, useEffect } from 'react';
import { Card, Button, Badge } from '@shared/components';
import { getTickets, updateTicket, deleteTicket } from '@services/api';
import '../incidencias/screens/IncidenciasScreen.css';

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
      }
    } catch (error) {
      // Mock data
      setTickets([
        { id: 1, asunto: 'No funciona navegación', usuario: 'Juan Pérez', estado: 'pendiente', prioridad: 'alta', fecha: '2025-12-25' },
        { id: 2, asunto: 'Error al registrar ruta', usuario: 'María García', estado: 'en_proceso', prioridad: 'media', fecha: '2025-12-24' },
      ]);
    }
  };

  const handleUpdateEstado = async (id, nuevoEstado) => {
    try {
      await updateTicket(id, { estado: nuevoEstado });
      loadTickets();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('¿Archivar este ticket?')) {
      try {
        await deleteTicket(id);
        loadTickets();
      } catch (error) {
        console.error('Error:', error);
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
    <div className="incidencias">
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
                    <button className="btn-icon" onClick={() => handleDelete(ticket.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
