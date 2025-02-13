import { useState } from "react";
import backArrow from "../assets/icons/arrowleftblue.svg";
import { NavLink } from "react-router-dom";
import emailjs from "emailjs-com";

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    msg: ""
  });
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventHandler = (event) => {
    const { name, value } = event.target;
    setData((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };

  const submitHandle = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    emailjs
      .send(
        "service_gma62g8",
        "template_gbhues5",
        {
          from_name: data.name,
          from_email: data.email,
          message: data.msg,
        },
        "tPch0atXkUD7a0czq"
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setFeedback("Message sent successfully!");
        // Reset form fields after successful submission
        setData({ name: "", email: "", msg: "" });
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.log("FAILED...", error);
        setFeedback("Failed to send the message, please try again later.");
        setIsSubmitting(false);
      });
  };

  return (
    <div className="contactPage py-5">
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
              <img src={backArrow} alt="Back" />
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
                    <label htmlFor="fullNameInput">Fullname</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullNameInput"
                      name="name"
                      onChange={eventHandler}
                      value={data.name}
                      placeholder="Fullname"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="emailInput">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      aria-describedby="emailHelp"
                      name="email"
                      onChange={eventHandler}
                      value={data.email}
                      placeholder="Enter email"
                      required
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="msgInput" className="form-label">
                      Comments
                    </label>
                    <textarea
                      className="form-control"
                      id="msgInput"
                      rows="3"
                      name="msg"
                      onChange={eventHandler}
                      value={data.msg}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Submit"}
                  </button>
                </form>
                {feedback && <p className="mt-3">{feedback}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;