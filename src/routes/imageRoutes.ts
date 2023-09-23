import { Router } from 'express';

const router = Router();

router.get('/', getAllImages);

router.post('/', createImage);

router.get('/:id', getImage);

router.put('/:id', updateImage);

router.delete('/:id', deleteImage);

router.get('/:itemId', getItemImages);

export default router;