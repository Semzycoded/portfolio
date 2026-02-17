import { useState } from 'react'
import backArrow from '../assets/icons/arrowleftblue.svg'
import { NavLink } from 'react-router-dom'
import emailjs from 'emailjs-com'

const Contact = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    msg: '',
  })
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const eventHandler = (event) => {
    const { name, value } = event.target
    setData((prevVal) => ({
      ...prevVal,
      [name]: value,
    }))
  }

  const submitHandle = (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    emailjs
      .send(
        'service_gma62g8',
        'template_gbhues5',
        {
          from_name: data.name,
          from_email: data.email,
          message: data.msg,
        },
        'tPch0atXkUD7a0czq'
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text)
        setFeedback('Message sent successfully!')
        // Reset form fields after successful submission
        setData({ name: '', email: '', msg: '' })
        setIsSubmitting(false)
      })
      .catch((error) => {
        console.log('FAILED...', error)
        setFeedback('Failed to send the message, please try again later.')
        setIsSubmitting(false)
      })
  }

  return (
    <div className="contactPage py-5">
      <section className="contact">
        <div className="container">
          <div style={{ marginTop: '5vh', position: 'absolute' }}>
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
                <h2 className="mb-4 text-center">Send Me a Message</h2>
                <form onSubmit={submitHandle}>
                  <div className="form-group">
                    <label htmlFor="fullNameInput">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullNameInput"
                      name="name"
                      onChange={eventHandler}
                      value={data.name}
                      placeholder="Full Name"
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
                      Leave a Message
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
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
                {feedback && (
                  <p className="mt-3 alert alert-info">{feedback}</p>
                )}
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="row d-flex justify-content-center mt-5 pt-5 border-top">
              <div className="col-12">
                <h2 className="mb-4 text-center">Get In Touch</h2>
                <div
                  className="row text-center"
                  style={{ marginBottom: '2rem' }}
                >
                  <div className="col-md-2 offset-md-1">
                    <h5>Email</h5>
                    <a
                      href="mailto:adeoyesemilore2007@gmail.com"
                      className="contact-link"
                    >
                      ➔ Tap to Email
                    </a>
                  </div>
                  <div className="col-md-2 offset-md-2">
                    <h5>LinkedIn</h5>
                    <a
                      href="https://www.linkedin.com/in/adeoye-semilore-343b89350/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      ➔ Tap to Connect on LinkedIn
                    </a>
                  </div>
                  <div className="col-md-2 offset-md-2">
                    <h5>GitHub</h5>
                    <a
                      href="https://github.com/Semzycoded"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      ➔ Semzycoded
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
