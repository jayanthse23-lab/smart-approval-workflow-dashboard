const express = require('express');
const Request = require('../models/Request');

const router = express.Router();

router.get('/requests', async (_req, res) => {
  try {
    const requests = await Request.find().sort({ timestamp: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch requests', error: error.message });
  }
});

router.get('/stats', async (_req, res) => {
  try {
    const [total, pending, approved, rejected] = await Promise.all([
      Request.countDocuments(),
      Request.countDocuments({ status: 'Pending' }),
      Request.countDocuments({ status: 'Approved' }),
      Request.countDocuments({ status: 'Rejected' }),
    ]);

    res.json({ total, pending, approved, rejected });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
  }
});

router.post('/requests', async (req, res) => {
  try {
    const { title, requesterName, priority, comment } = req.body;

    if (!title || !requesterName) {
      return res.status(400).json({ message: 'Title and requesterName are required' });
    }

    const comments = comment ? [{ message: comment }] : [];
    const request = await Request.create({ title, requesterName, priority, comments });

    return res.status(201).json(request);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create request', error: error.message });
  }
});

router.patch('/requests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comment } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status must be Approved or Rejected' });
    }

    const update = { status };

    if (comment && comment.trim()) {
      update.$push = { comments: { message: comment.trim() } };
    }

    const request = await Request.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    return res.json(request);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update request', error: error.message });
  }
});

module.exports = router;
