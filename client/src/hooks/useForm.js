import { useState, useEffect } from "react";

export default function useForm(initialState, submitCallback) {
  const [formState, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...formState, [name]: value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    // setErrors(validate(formState));
    setIsSubmitting(true);
  };

  useEffect(() => {
    // if (Object.keys(errors).length === 0 && isSubmitting)
    //   submitCallback();
    if (isSubmitting) {
      setIsSubmitting(false);
      submitCallback(formState);
    }
  }, [isSubmitting]);

  return {
    handleChange,
    handleSubmit,
    formState,
    setForm
    // errors
  };
};