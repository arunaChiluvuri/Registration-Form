import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();

  const capitalizeWords = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Username: "",
    Email: "",
    Password: "",
    Phone: "",
    CountryCode: "",
    Country: "",
    City: "",
    PAN: "",
    Aadhaar: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e, type = "normal") => {
    let value = e.target.value;

    if (type === "capitalize") value = capitalizeWords(value);
    if (type === "pan") value = value.toUpperCase();

    setFormData({ ...formData, [e.target.name]: value });
  };

  const validate = () => {
    let temp = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) temp[key] = "This field is required";
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      temp.email = "Invalid email format";
    }

    if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan)) {
      temp.pan = "Invalid PAN format";
    }

    if (formData.aadhaar && !/^[0-9]{12}$/.test(formData.aadhaar)) {
      temp.aadhaar = "Aadhaar must be 12 digits";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/success", { state: formData });
    }
  };

  const isFormValid = Object.values(formData).every((v) => v !== "");

  return (
    <div className="container">
      <h2>Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <label>
          First Name <span className="required">*</span>
        </label>
        <input
          name="FirstName"
          onChange={(e) => handleChange(e, "capitalize")}
        />
        <p className="error">{errors.firstName}</p>

        <label>
          Last Name <span className="required">*</span>
        </label>
        <input
          name="LastName"
          onChange={(e) => handleChange(e, "capitalize")}
        />
        <p className="error">{errors.lastName}</p>

        <label>
          Username <span className="required">*</span>
        </label>
        <input name="Username" onChange={handleChange} />
        <p className="error">{errors.username}</p>

        <label>
          Email <span className="required">*</span>
        </label>
        <input name="Email" onChange={handleChange} />
        <p className="error">{errors.email}</p>

        <label>
          Password <span className="required">*</span>
        </label>
        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            name="Password"
            onChange={handleChange}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <p className="error">{errors.password}</p>

        <label>
          Country Code <span className="required">*</span>
        </label>
        <input name="CountryCode" onChange={handleChange} />
        <p className="error">{errors.countryCode}</p>

        <label>
          Phone Number <span className="required">*</span>
        </label>
        <input name="Phone" onChange={handleChange} />
        <p className="error">{errors.phone}</p>

        <label>
          Country <span className="required">*</span>
        </label>
        <input name="Country" onChange={(e) => handleChange(e, "capitalize")} />
        <p className="error">{errors.country}</p>

        <label>
          City <span className="required">*</span>
        </label>
        <input name="City" onChange={(e) => handleChange(e, "capitalize")} />
        <p className="error">{errors.city}</p>

        <label>
          PAN <span className="required">*</span>
        </label>
        <input name="PAN" onChange={(e) => handleChange(e, "pan")} />
        <p className="error">{errors.pan}</p>

        <label>
          Aadhaar <span className="required">*</span>
        </label>
        <input name="Aadhaar" onChange={handleChange} />
        <p className="error">{errors.aadhaar}</p>

        <button type="Submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
