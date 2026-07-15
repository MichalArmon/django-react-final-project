import { useState } from "react";

export default function useForm(initialValues, schema, onSubmit) {
  const [errors, setErrors] = useState({});
  const [formDetails, setFormDetails] = useState(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formDetails);
    const { error } = schema.validate(formDetails, { abortEarly: false });
    console.log(error);
    onSubmit(formDetails);
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
    const fieldSchema = schema.extract(name);
    const { error } = fieldSchema.validate(value);
    console.log(error);
    setErrors((prev) => ({
      ...prev,
      [name]: error ? error.details[0].message : "",
    }));
  };

  return { handleChange, handleSubmit, errors, formDetails };
}
