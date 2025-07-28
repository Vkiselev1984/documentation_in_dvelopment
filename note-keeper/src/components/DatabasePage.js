import React, { useState, useEffect } from 'react';

const TABLES = [
  { key: 'posts', label: 'Posts' },
  { key: 'categories', label: 'Categories' },
  { key: 'images', label: 'Images' }
];

const DatabasePage = () => {
  const [table, setTable] = useState('posts');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editRow, setEditRow] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchTable = async (tableKey) => {
    setLoading(true);
    setError('');
    setData([]);
    try {
      const res = await fetch(`http://localhost:4000/api/db/${tableKey}`);
      if (!res.ok) throw new Error('Failed to fetch table');
      setData(await res.json());
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTable(table);
    setEditRow(null);
    setEditData({});
  }, [table]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return;
    setLoading(true);
    try {
      await fetch(`http://localhost:4000/api/db/${table}/${id}`, { method: 'DELETE' });
      fetchTable(table);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const handleEdit = (row) => {
    setEditRow(row.id);
    setEditData({ ...row });
  };

  const handleEditChange = (key, value) => {
    setEditData(prev => ({ ...prev, [key]: value }));
  };

  const handleEditSave = async () => {
    setLoading(true);
    try {
      await fetch(`http://localhost:4000/api/db/${table}/${editRow}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });
      setEditRow(null);
      setEditData({});
      fetchTable(table);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Database Info</h2>
      <div className="mb-3">
        {TABLES.map(t => (
          <button
            key={t.key}
            className={`btn btn-sm me-2 ${table === t.key ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setTable(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                {data[0] && Object.keys(data[0]).map(col => (
                  <th key={col}>{col}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {data[0] && Object.keys(data[0]).map((col, j) => (
                    <td key={j}>
                      {editRow === row.id ? (
                        <input
                          value={editData[col] ?? ''}
                          onChange={e => handleEditChange(col, e.target.value)}
                          className="form-control form-control-sm"
                          disabled={col === 'id'}
                        />
                      ) : (
                        row[col]
                      )}
                    </td>
                  ))}
                  <td>
                    {editRow === row.id ? (
                      <>
                        <button className="btn btn-success btn-sm me-1" onClick={handleEditSave}>Save</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditRow(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-outline-primary btn-sm me-1" onClick={() => handleEdit(row)}>Edit</button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(row.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && <div>No data</div>}
        </div>
      )}
      <hr/>
      <div>
        The SQLite database file is <b>note-keeper.db</b> in the project root.<br/>
        You can view or edit the database using:
        <ul>
          <li>DB Browser for SQLite (<a href="https://sqlitebrowser.org/" target="_blank" rel="noopener noreferrer">link</a>)</li>
          <li>SQLiteStudio (<a href="https://sqlitestudio.pl/" target="_blank" rel="noopener noreferrer">link</a>)</li>
          <li>VS Code SQLite extensions</li>
          <li>CLI:<br/>
            <code>sqlite3 note-keeper.db</code><br/>
            <code>.tables</code><br/>
            <code>SELECT * FROM posts;</code><br/>
            <code>SELECT * FROM categories;</code><br/>
            <code>SELECT * FROM images;</code><br/>
            <code>.exit</code>
          </li>
        </ul>
        <br/>
        You can also add your own API endpoints for advanced database management.
      </div>
    </div>
  );
};

export default DatabasePage;
