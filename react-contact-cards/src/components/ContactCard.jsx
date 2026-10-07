// Reusable contact card — receives all data via props
function ContactCard({ name, email, phone }) {
  return (
    <div className="contact-card">
      <h3>{name}</h3>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone || "—"}</p>
    </div>
  );
}

export default ContactCard;
