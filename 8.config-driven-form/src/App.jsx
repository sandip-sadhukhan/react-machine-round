import './App.css'
import Form from './components/form';
import * as yup from "yup";

function App() {
  const schema = [
    {
      component: "TEXT_FIELD",
      name: "name",
      label: "Your Name",
      isRequired: true,
      validate: yup.string().required("Name is Required"),
      type: "text"
    },
    {
      component: "TEXT_FIELD",
      name: "email",
      label: "Your Email",
      isRequired: true,
      validate: yup
        .string()
        .email("Invalid Email address")
        .required("Email is Required"),
      type: "email"
    },
    {
      component: "TEXT_FIELD",
      name: "password",
      label: "Password",
      isRequired: true,
      validate: yup
        .string()
        .required("Password is Required")
        .min(8, "Password must be at least 8 characters"),
      type: "password"
    },
    {
      component: "TEXT_FIELD",
      name: "confirmPassword",
      label: "Confirm Password",
      isRequired: true,
      validate: yup
        .string()
        .oneOf([yup.ref("password")], "Password must match")
        .required("Password is Required"),
      type: "password"
    },
    {
      component: "RADIO_BUTTON",
      name: "gender",
      label: "Gender",
      isRequired: true,
      options: ["Male", "Female", "Other"],
      validate: yup.string().required("Selecting a gender is required")
    },
    {
      component: "DATE_PICKER",
      name: "birthdate",
      label: "Date of Birth",
      validate: yup.date(),
    },
    {
      component: "SLIDER",
      name: "rating",
      label: "Rating",
      minValue: 1,
      maxValue: 5,
      validate: yup
        .number()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be no more than 5")
    },
    {
      component: "CHECKBOX",
      name: "accept-terms",
      label: "I accept the terms and conditions",
      isRequired: true,
      validate: yup
        .bool()
        .oneOf([true], "You must accept the terms and conditions")
        .required("Please accept the terms")
    },
  ];

  const onSubmit = (formData) => {
    console.log("Form data = ", formData)
  }

  return (
    <div className="App">
      <h1>Config Driven Form</h1>
      <Form schema={schema} onSubmit={onSubmit} />
    </div>
  )
}

export default App
