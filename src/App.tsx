import "./App.css";
import React, { useState } from 'react';

interface FormData {
    phone: string;
    message: string;
}

const Form = () => {
    const [formData, setFormData] = useState<FormData>({ phone: '', message: '' });
    const [phoneError, setPhoneError] = useState('');
    const [messageError, setMessageError] = useState('');
    const regexUK = /^(\+44|0)\s?\d{4}\s?\d{6}$/;
    const UrlRequest = "https://xsxdjn99w1.execute-api.us-east-1.amazonaws.com/dev/";

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPhoneError('');
        setMessageError('');

        if (!formData.phone.match(regexUK)) {
            setPhoneError('Please enter a valid phone number.');
            return;
        }

        if (!formData.message) {
            setMessageError('Please enter a message.');
            return;
        }

        fetch(UrlRequest, {
            method: 'POST',
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                alert('Form submitted successfully!');
                setFormData({ phone: '', message: '' });
            })
            .catch((error) => {
                console.error('There was a problem with the form submission:', error);
                alert('There was an error submitting the form. Please try again later.');
            });
    };

    return (
        <div className="container">
            <h1>Send a message</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="phone">Phone number (+44XXX or 0XXX):</label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />
                {phoneError && <span className="error">{phoneError}</span>}
                <label htmlFor="message">Message:</label>
                <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                ></textarea>
                {messageError && <span className="error">{messageError}</span>}
                <input type="submit" value="Send message" />
            </form>
        </div>
    );
};

export default Form;
