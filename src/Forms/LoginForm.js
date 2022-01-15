import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react/cjs/react.development";

const LoginForm = ({ login }) => {
  const initialState = {
    username: "",
    password: "",
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
    console.log(formData);
    const res = await login(formData);
    if (res.success) {
      navigate("/");
    } else {
      setErrors(res.errors);
      console.log(res.errors);
    }
  };

  return (
    <>
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
        <a href="/register">Don't have an account? Click here</a>
      </form>
    </>
  );
};

export default LoginForm;
