
const ContactUs = require('../Models/ContactModel');
const Comment = require('../Models/CommentsModel');

exports.userComplaint = async (req, res) => {

  try {
    const contact = new ContactUs({
      compaint: req.body.detailsIssue,
      userId: req.userId
    })
    await contact.save()
    res.status(200).json({ msg: 'will see on your complaint' })

  } catch (err) {
    console.log(err)
    res.status(500).json({ 'error': err })
  }
}


exports.postcommentHandler = async (req, res) => {
  try {

    const comment = new Comment({

      comment: req.body.comment,
      rateing: req.body.rateing,
      user: req.userId.displayName,
      productId: req.body.prodId
    })
    const comm = await comment.save();

    if (comm) res.status(200).json({ comm });
    else if (!comm) res.status(400).json({ msg: 'somthing when wrong' });

  } catch (err) {
    res.status(500).json({ 'error': err });
  }

}

exports.getcommentHandler = async (req, res) => {

  try {
    const prodId = req.params.id

    const comm = await Comment.find({ productId: prodId });
    if (comm) res.status(200).json({ comm });

    else if (!comm) res.status(404).json({ msg: 'no comments found' });

  } catch (err) {
    res.status(500).json({ 'error': err });
  }
}