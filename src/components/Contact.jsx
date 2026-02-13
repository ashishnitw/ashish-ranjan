import { useState } from 'react'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formState)
    setSubmitted(true)
    setFormState({ name: '', email: '', message: '' })
    
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="contact">
      <div className="contact-header">
        <h2 className="contact-title">Get In Touch</h2>
        <p className="contact-subtitle">
          Have a question or want to collaborate? Reach out to me directly or send a message below.
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h3 className="info-title">Connect with me</h3>
          <ul className="contact-links">
            <li>
              <a href="mailto:ashish@example.com">Email</a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            </li>
            <li>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              placeholder="Your message..."
              rows="5"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
          {submitted && <p className="success-message">✓ Message sent successfully!</p>}
        </form>
      </div>
    </section>
  )
}
