import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react/cjs/react.development";
import { v4 as uuidv4 } from "uuid";
import errorMessages from "../helpers/errors";

const RegisterForm = ({ register }) => {
  const initialState = {
    username: "",
    password: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.username.trim() === "" ||
      formData.password.trim() === "" ||
      formData.email.trim() === ""
    ) {
      setErrors(["Empty fields"]);
      return;
    }
    const res = await register(
      formData.username,
      formData.password,
      formData.email
    );
    if (res.success) {
      navigate("/profile");
    } else {
      const resErrors = res.errors.response.data;
      Array.isArray(resErrors) ? setErrors(resErrors) : setErrors([resErrors]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="username"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button>Submit</button>
      {errors &&
        errors.map((e) => (
          <span className="error-msg" key={uuidv4()}>
            {errorMessages[e]}
          </span>
        ))}
      <a href="/login">Already have an account? Login here</a>
    </form>
  );
};

export default RegisterForm;
