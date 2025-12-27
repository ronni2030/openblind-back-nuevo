/**
 * Incidencias Screen - Gestión de Incidencias (CRUD completo)
 *
 * @author MALDONADO DELGADO DAVID ALEJANDRO (N°5)
 */

import { useState, useEffect } from 'react';
import { Card, Button, Badge } from '@shared/components';
import { getIncidencias, createIncidencia, updateIncidencia, deleteIncidencia } from '@services/api';
import './IncidenciasScreen.css';

export default function IncidenciasScreen() {
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    zona: '',
    tipo: 'accesibilidad',
    estado: 'pendiente',
  });

  useEffect(() => {
    loadIncidencias();
  }, []);

  const loadIncidencias = async () => {
    try {
      const response = await getIncidencias();
      if (response.success) {
        setIncidencias(response.data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      // Mock data para demo
      setIncidencias([
        { id: 1, titulo: 'Rampa inaccesible', zona: 'Centro', tipo: 'accesibilidad', estado: 'pendiente', fecha: '2025-12-25' },
        { id: 2, titulo: 'Semáforo sin audio', zona: 'Norte', tipo: 'señalización', estado: 'en_revision', fecha: '2025-12-24' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateIncidencia(editingId, formData);
      } else {
        await createIncidencia(formData);
      }
      loadIncidencias();
      closeModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar esta incidencia?')) {
      try {
        await deleteIncidencia(id);
        loadIncidencias();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const openModal = (incidencia = null) => {
    if (incidencia) {
      setEditingId(incidencia.id);
      setFormData(incidencia);
    } else {
      setEditingId(null);
      setFormData({ titulo: '', descripcion: '', zona: '', tipo: 'accesibilidad', estado: 'pendiente' });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
  };

  const getEstadoBadge = (estado) => {
    const variants = {
      'pendiente': 'warning',
      'en_revision': 'info',
      'resuelta': 'success',
      'descartada': 'neutral',
    };
    return variants[estado] || 'neutral';
  };

  return (
    <div className="incidencias">
      <div className="page-header">
        <div>
          <h1>Gestión de Incidencias</h1>
          <p>Registrar y gestionar incidencias detectadas en el sistema</p>
        </div>
        <Button variant="primary" onClick={() => openModal()}>
          + Nueva Incidencia
        </Button>
      </div>

      <Card>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Zona</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {incidencias.map((inc) => (
                <tr key={inc.id}>
                  <td>#{inc.id}</td>
                  <td>{inc.titulo}</td>
                  <td>{inc.zona}</td>
                  <td><Badge variant="primary" size="sm">{inc.tipo}</Badge></td>
                  <td><Badge variant={getEstadoBadge(inc.estado)} size="sm">{inc.estado.replace('_', ' ')}</Badge></td>
                  <td>{inc.fecha}</td>
                  <td className="actions">
                    <button className="btn-icon" onClick={() => openModal(inc)}>✏️</button>
                    <button className="btn-icon" onClick={() => handleDelete(inc.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Editar Incidencia' : 'Nueva Incidencia'}</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  className="input"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  className="input"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  rows="4"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Zona</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.zona}
                    onChange={(e) => setFormData({ ...formData, zona: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tipo</label>
                  <select
                    className="input"
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  >
                    <option value="accesibilidad">Accesibilidad</option>
                    <option value="señalización">Señalización</option>
                    <option value="infraestructura">Infraestructura</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select
                  className="input"
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_revision">En Revisión</option>
                  <option value="resuelta">Resuelta</option>
                  <option value="descartada">Descartada</option>
                </select>
              </div>
              <div className="modal-actions">
                <Button type="button" variant="ghost" onClick={closeModal}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  {editingId ? 'Guardar Cambios' : 'Crear Incidencia'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
