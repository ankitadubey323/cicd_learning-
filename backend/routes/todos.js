import express from 'express';
import Todo from '../models/Todo.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try{
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
  }catch(err){
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try{
    const { text } = req.body;
    if(!text) return res.status(400).json({ message: 'Text required' });
    const todo = await Todo.create({ text, user: req.userId });
    res.json(todo);
  }catch(err){
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const update = await Todo.findOneAndUpdate({ _id: id, user: req.userId }, req.body, { new: true });
    if(!update) return res.status(404).json({ message: 'Not found' });
    res.json(update);
  }catch(err){
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const removed = await Todo.findOneAndDelete({ _id: id, user: req.userId });
    if(!removed) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true });
  }catch(err){
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
