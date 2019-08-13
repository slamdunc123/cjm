const express = require('express');
const router = express.Router();

// Member Model
const Member = require('../../models/Member');

// @route GET api/members
// @desc Get all members
// @access Public

router.get('/', (req, res) => {
  Member.find()
    .sort({ date: -1 })
    .then(members => res.json(members));
});

// @route POST api/members
// @desc Create a member
// @access Public

router.post('/', (req, res) => {
  const newMember = new Member({
    name: req.body.name,
    role: req.body.role
  });

  newMember.save().then(member => res.json(member));
});

// @route DELETE api/members
// @desc Delete a member
// @access Public

router.delete('/:id', (req, res) => {
  Member.findOneAndDelete({ _id: req.params.id })
    .then(member => res.send(member))
    .catch(err => res.status(404).json({ success: false }));
});

// @route UPDATE api/members
// @desc Update an member
// @access Public

router.put('/:id', (req, res) => {
  Member.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Member.findOne({ _id: req.params.id }).then(member => {
        res.json(member);
      });
    })
    // .then(member => res.send(member).then(() => res.json({ success: true })))
    // .then(console.log('update detected'))
    .catch(err => res.status(404).json({ success: false }));
});
// router.route('/:id').put((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(member => {
//       member.username = req.body.username;
//       // exercise.description = req.body.description;
//       // exercise.duration = Number(req.body.duration);
//       // exercise.date = Date.parse(req.body.date);

//       exercise
//         .save()
//         .then(() => res.json('Member updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;
