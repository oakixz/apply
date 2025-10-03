import pool from "../pool.js";

export const home = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() as now");
    res.json({ success: true, time: rows[0].now });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
