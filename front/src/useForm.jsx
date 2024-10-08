import React, {useState} from 'react';

const useForm = (initialValues) => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return {formData, handleChange};
}

export default useForm;