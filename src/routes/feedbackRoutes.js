const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Feedback = mongoose.model('Feedback');

const router = express.Router();

router.use(requireAuth);

router.get('/feedback', async (req, res) => {
  const feedback = await Feedback.find({ userId: req.user._id });
  res.send(feedback);
});

router.post('/feedback', async (req, res) => {
  const { subject, desc } = req.body;

  if (!subject || !desc) {
    return res
      .status(422)
      .send({ error: 'You must provide a Subject and Description' });
  }

  try {
    const feedback = new Feedback({ subject, desc, userId: req.user._id });
    await feedback.save();
    res.send(feedback);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put('/feedback', async (req, res) => {
  const { _id, subject, desc } = req.body;
  if (!subject || !desc) {
    return res
      .status(422)
      .send({ error: 'You must provide a Subject and Description' });
  }

  try {
    const feedback = await Feedback.findByIdAndUpdate( _id, { subject, desc });
    res.send({ status: 'success' });
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.delete('/feedback', async (req, res) => {
  const _id  = req.body;

  try {
    const feedback = await Feedback.findByIdAndRemove( _id );
    res.send({ status: 'success' });
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
