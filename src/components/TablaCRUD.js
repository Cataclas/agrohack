import React, { useState } from 'react';
import './TablaCRUD.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const TablaCRUD = ({ columns, data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formValues, setFormValues] = useState({});
  const rowsPerPage = 5;

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    applyFiltersAndSorting({ term, filters, sortConfig });
  };

  const handleFilterChange = (columnKey, value) => {
    const newFilters = { ...filters, [columnKey]: value };
    setFilters(newFilters);
    applyFiltersAndSorting({ searchTerm, filters: newFilters, sortConfig });
  };

  const handleSort = (key) => {
    const order = sortConfig?.key === key && sortConfig.order === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, order });
    applyFiltersAndSorting({ searchTerm, filters, sortConfig: { key, order } });
  };

  const applyFiltersAndSorting = ({ term, filters, sortConfig }) => {
    let result = data;

    // Aplicar búsqueda global
    if (term) {
      result = result.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(term)
        )
      );
    }

    // Aplicar filtros por columna
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((row) =>
          String(row[key]).toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    // Aplicar ordenación
    if (sortConfig) {
      const { key, order } = sortConfig;
      result = [...result].sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredData(result);
    setCurrentPage(1); // Reiniciar a la primera página
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openAddModal = () => {
    setFormValues({});
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    setFormValues(row);
    setSelectedRow(row);
    setEditModalOpen(true);
  };

  const openDeleteModal = (row) => {
    setSelectedRow(row);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    setFilteredData((prev) => prev.filter((row) => row !== selectedRow));
    setDeleteModalOpen(false);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const renderActions = (row) => (
    <td>
      <button className="action-btn edit-btn" onClick={() => openEditModal(row)}>
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button className="action-btn delete-btn" onClick={() => openDeleteModal(row)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </td>
  );

  return (
    <div className="tabla-crud-container">
      <div className="tabla-crud-actions">
        <input
          type="text"
          placeholder="Buscar global..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="add-btn" onClick={openAddModal}>
          <FontAwesomeIcon icon={faPlus} /> Agregar
        </button>
      </div>

      <table className="tabla-crud">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} onClick={() => handleSort(col.dataIndex)}>
                {col.title}
                {sortConfig?.key === col.dataIndex && (
                  <span>{sortConfig.order === 'asc' ? ' ⬆️' : ' ⬇️'}</span>
                )}
              </th>
            ))}
            <th>Acciones</th>
          </tr>
          <tr>
            {columns.map((col) => (
              <th key={`filter-${col.key}`}>
                <input
                  type="text"
                  placeholder={`Filtrar ${col.title}`}
                  onChange={(e) => handleFilterChange(col.dataIndex, e.target.value)}
                />
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.dataIndex]}</td>
              ))}
              {renderActions(row)}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modales */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Agregar Nuevo Registro</h2>
            <button onClick={() => setModalOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Registro</h2>
            <button onClick={() => setEditModalOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>¿Está seguro de que desea eliminar este registro?</h2>
            <button onClick={() => setDeleteModalOpen(false)}>Cancelar</button>
            <button onClick={handleDelete}>Confirmar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablaCRUD;