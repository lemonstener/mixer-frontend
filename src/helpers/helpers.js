const errorMessages = {
  "instance.username does not meet minimum length of 5":
    "Username must be at least 5 characters long",
  "instance.password does not meet minimum length of 5":
    "Password must be at least 5 characters long",
  'instance.email does not conform to the "email" format':
    "Invalid email format, please try again",
  "Invalid username/password": "Invalid username/password",
  "Empty fields": "Please fill up the form completely",
};

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export { errorMessages, BASE_URL };
