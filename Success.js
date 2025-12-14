import { useLocation } from "react-router-dom";

function Success() {
  const { state } = useLocation();

  return (
    <div className="container success">
      <h2>Form Submitted Successfully 🎉</h2>

      {Object.entries(state).map(([key, value]) => (
        <p key={key}>
          <b>{key}:</b> {value}
        </p>
      ))}
    </div>
  );
}

export default Success;
