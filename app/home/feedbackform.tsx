'use client'
import { Button, Input, Spinner, Textarea } from '@nextui-org/react';
import axios from "axios";
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const FeedbackForm = () => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const user_id = process.env.NEXT_PUBLIC_USER_ID;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(`https://abicmanpowerservicecorp.com/api/main/testimonial`, { user_id, first_name, last_name, message });
            toast.success("Feedback submitted successfully!");
            setFirstName("")
            setLastName("")
            setMessage("")
        } catch (error) {
            toast.error("Failed to submit feedback.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className='min-w-lg flex flex-col gap-4 py-8'>
                <Input label="First Name" value={first_name} onChange={(e) => setFirstName(e.target.value)} required placeholder="eg. Juan" />
                <Input label="Last Name" value={last_name} onChange={(e) => setLastName(e.target.value)} required placeholder="eg. Dela Cruz" />
                <Textarea label="Message" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Leave us message.." />
                <Button type="submit" variant='solid' className='bg-violet-500 text-white text-base uppercase' isDisabled={loading}>
                    {loading ? <Spinner size="sm" color="current" /> : "Submit Feedback"}
                </Button>
            </div >
        </form>
    );
}

export default FeedbackForm;
