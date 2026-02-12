import { useState } from 'react';

const defaultForm = {
  title: '',
  requesterName: '',
  priority: 'Medium',
  comment: '',
};

const NewRequestModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      setFormData(defaultForm);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" role="presentation">
      <div className="modal">
        <h2>Submit New Request</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Title
            <input name="title" value={formData.title} onChange={handleChange} required />
          </label>

          <label>
            Requester Name
            <input
              name="requesterName"
              value={formData.requesterName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Priority
            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>

          <label>
            Initial Comment
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Optional details"
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRequestModal;
