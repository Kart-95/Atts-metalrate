import { useEffect, useState } from "react";
import {
  getPurities,
  createPurity,
  updatePurity,
  deletePurity,
} from "../api/PurityApi";

function PurityManagement() {
  const [purities, setPurities] = useState([]);
  const [formData, setFormData] = useState({ metal: "", name: "" });
  const [editId, setEditId] = useState(null);

  // Fetch all purities
  const fetchPurities = async () => {
    try {
      const res = await getPurities();
      setPurities(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPurities();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updatePurity(editId, formData);
        setEditId(null);
      } else {
        await createPurity(formData);
      }
      setFormData({ metal: "Gold", name: "" });
      fetchPurities();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await deletePurity(id);
      fetchPurities();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle edit
  const handleEdit = (purity) => {
    setFormData({
      metal: purity.metal,
      name: purity.name,
    });
    setEditId(purity._id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Purity Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <select
          value={formData.metal}
          onChange={(e) => setFormData({ ...formData, metal: e.target.value })}
          required
        >
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Platinum">Platinum</option>
        </select>
        <input
          type="text"
          placeholder="Purity Name (e.g. 22K)"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          style={{ marginLeft: "10px" }}
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* List */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Metal</th>
            <th>Purity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {purities.map((p) => (
            <tr key={p._id}>
              <td>{p.metal}</td>
              <td>{p.name}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p._id)} style={{ marginLeft: "5px" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PurityManagement;
