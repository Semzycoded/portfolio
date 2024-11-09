import { useState } from "react";
import backArrow from "../assets/icons/arrowleftblue.svg";
import { NavLink } from "react-router-dom";
import emailjs from "emailjs-com";  // Import EmailJS

const Contact = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        msg: ""
    });

    const eventHandler = (event) => {
        const { name, value } = event.target;
        setData((prevVal) => ({
            ...prevVal,
            [name]: value,
        }));
    };

    const submitHandle = (event) => {
        event.preventDefault();

        // EmailJS configuration
        // emailjs.send(
        //     "service_gma62g8",
        //     "template_gbhues5",
        //     {
        //         name: data.name,
        //         email: data.email,
        //         message: data.msg,
        //     },
        //     "YOUR_USER_ID"
        // )
        // .then((response) => {
        //     alert("Message sent successfully!");
        // })
        // .catch((error) => {
        //     alert("Failed to send the message, please try again later.");
        // });

        emailjs.send('service_gma62g8', 'template_gbhues5', {
        from_name: data.name,
        from_email: data.email,
        message: data.msg,
        }, 'tPch0atXkUD7a0czq')
        .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        })
        .catch((error) => {
        console.log('FAILED...', error);
        });

    };

    return (
        <div>
            <section className="contact">
                <div className="container">
                    <div style={{ marginTop: "5vh", position: "absolute" }}>
                        <NavLink
                            className="nav-link active"
                            id="pills-home-tab"
                            data-toggle="pill"
                            to="/"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                        >
                            <img src={backArrow} alt="" />
                        </NavLink>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center py-4 mb-5">
                            <h1>Contact</h1>
                            <hr />
                        </div>
                    </div>
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-8 mb-5">
                                <form onSubmit={submitHandle}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Fullname</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            name="name"
                                            onChange={eventHandler}
                                            value={data.name}
                                            placeholder="Fullname"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            name="email"
                                            onChange={eventHandler}
                                            value={data.email}
                                            placeholder="Enter email"
                                        />
                                        <small id="emailHelp" className="form-text text-muted">
                                            We'll never share your email with anyone else.
                                        </small>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput" className="form-label">Comments</label>
                                        <textarea
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            rows="3"
                                            name="msg"
                                            onChange={eventHandler}
                                            value={data.msg}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-outline-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
