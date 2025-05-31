import { Router } from 'express';
import Category from '../models/Category';

const router = Router();

router.post('/', async (req, res) => {
  
  // request { name and description from body}
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create category' });
  }
});

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err: any) {
    res.status(400).json({ error: 'Failed to fetch categories' });
  }
});

export default router;