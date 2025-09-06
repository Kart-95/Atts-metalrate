import { useEffect, useState } from "react";
import { getPurities } from "../api/PurityApi";
import { getLatestRate } from "../api/RateApi";
import { getRatesByMetalAndPurity, createRate } from "../api/RateApi";

function MetalRateManagement() {
  const [purities, setPurities] = useState([]);
  const [formData, setFormData] = useState({
    metal: "Gold",
    purity: "",
    rate: "",
    date: "",
  });
  const [latestRate, setLatestRate] = useState(null);
  const [history, setHistory] = useState([]);

  // Load Purities on mount
  useEffect(() => {
    const fetchPurities = async () => {
      try {
        const res = await getPurities();
        setPurities(res.data);
        if (res.data.length > 0) {
          setFormData((prev) => ({ ...prev, purity: res.data[0].name }));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPurities();
  }, []);

  // Fetch rates whenever Metal/Purity changes
  useEffect(() => {
    if (formData.metal && formData.purity) {
      fetchRates(formData.metal, formData.purity);
    }
  }, [formData.metal, formData.purity]);

  const fetchRates = async (metal, purity) => {
    try {
      const res = await getRatesByMetalAndPurity(metal, purity);
      const rates = res.data;
      setHistory(rates);
      if (rates.length > 0) {
        setLatestRate(rates[rates.length - 1]); // last entry = latest
      } else {
        setLatestRate(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRate(formData);
      setFormData((prev) => ({ ...prev, rate: "", date: "" }));
      fetchRates(formData.metal, formData.purity);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Metal Rate Management</h2>

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

        <select
          value={formData.purity}
          onChange={(e) => setFormData({ ...formData, purity: e.target.value })}
          required
          style={{ marginLeft: "10px" }}
        >
          {purities
            .filter((p) => p.metal === formData.metal)
            .map((p) => (
              <option key={p._id} value={p.name}>
                {p.name}
              </option>
            ))}
        </select>

        <input
          type="number"
          placeholder="Rate"
          value={formData.rate}
          onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
          required
          style={{ marginLeft: "10px" }}
        />

        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
          style={{ marginLeft: "10px" }}
        />

        <button type="submit" style={{ marginLeft: "10px" }}>
          Add Rate
        </button>
      </form>

      {/* Latest Rate */}
      {latestRate ? (
        <p>
          Latest {latestRate.metal} ({latestRate.purity}) Rate: {latestRate.rate} on{" "}
          {new Date(latestRate.date).toLocaleDateString()}
        </p>
      ) : (
        <p>No previous rate found for this Metal & Purity.</p>
      )}

      {/* History Table */}
      <h3>Rate History</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Metal</th>
            <th>Purity</th>
            <th>Rate</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((r) => (
            <tr key={r._id}>
              <td>{r.metal}</td>
              <td>{r.purity}</td>
              <td>{r.rate}</td>
              <td>{new Date(r.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MetalRateManagement;
