import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Dashboard</h2>

      <p>Welcome to Studio Equipment Rental 🎬</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
