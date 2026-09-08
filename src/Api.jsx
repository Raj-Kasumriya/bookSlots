import "./App.css";
import axios from 'axios';


export const studentIdAndFindAllSlots = async (id) => {
    try {
        return (axios.get(`https://bookslotsapi.onrender.com/api/slots/${id}`)).then((response) => {
            console.log(response)
        })

    } catch (err) {

        console.log(err)
    }
};



export const mentorIdSlots = async (id) => {
    try {
        return (axios.get(`https://bookslotsapi.onrender.com/api/slots/${_id}`)).then((response) => {
            console.log(response)
        })

    } catch (err) {

        console.log(err)
    }
};

export const mentorDeleteSlots = async (id) => {
    try {
        return (axios.get(`https://bookslotsapi.onrender.com/api/slots/${_id}`)).then((response) => {
            console.log(response)
        })

    } catch (err) {

        console.log(err)
    }
};

export const mentorSentSlots = async (id) => {
    try {
        return (axios.get(`https://bookslotsapi.onrender.com/api/slots/${_id}`)).then((response) => {
            console.log(response)
        })

    } catch (err) {

        console.log(err)
    }
};

export const mentorUpdateSlots = async (id) => {
    try {
        return (axios.get(`https://bookslotsapi.onrender.com/api/slots/${_id}`)).then((response) => {
            console.log(response)
        })

    } catch (err) {

        console.log(err)
    }
};



export const deleteAllSlots = async (id) => {
    try {
        return (axios.get(`https://bookslotsapi.onrender.com/api/slots/${_id}`)).then((response) => {
            console.log(response)
        })

    } catch (err) {

        console.log(err)
    }
};


export const studentFindBookSlots = async (id) => {
    try {
        return (axios.get(`https://bookslotsapi.onrender.com/api/slots/${_id}`)).then((response) => {
            console.log(response)
        })

    } catch (err) {

        console.log(err)
    }
};


export const mentorFindBookSlots = async (id) => {
    try {
        return (axios.get(`https://bookslotsapi.onrender.com/api/slots/${_id}`)).then((response) => {
            console.log(response)
        })

    } catch (err) {

        console.log(err)
    }
};

export const studentBookSlots = async (id) => {
    try {
        return (axios.get(`https://bookslotsapi.onrender.com/api/slots/${_id}`)).then((response) => {
            console.log(response)
        })

    } catch (err) {

        console.log(err)
    }
};

export const studentBookSlotsDelete = async (id) => {
    try {
        return (axios.get(`https://bookslotsapi.onrender.com/api/slots/${_id}`)).then((response) => {
            console.log(response)
        })

    } catch (err) {

        console.log(err)
    }
};

export const deleteAllBookedSlots = async (id) => {
    try {
        return (axios.get(`https://bookslotsapi.onrender.com/api/slots/${_id}`)).then((response) => {
            console.log(response)
        })

    } catch (err) {

        console.log(err)
    }
};



