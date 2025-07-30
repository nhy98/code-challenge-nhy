import { Router } from 'express';
import {
    createResource,
    listResources,
    getResource,
    updateResource,
    deleteResource,
} from '../controllers/resourceController';
import { validate } from '../middleware/validate';
import { createResourceSchema, updateResourceSchema } from '../validators/resourceValidator';

const router = Router();

router.post('/', validate(createResourceSchema), createResource);
router.get('/', listResources);
router.get('/:id', getResource);
router.put('/:id', validate(updateResourceSchema), updateResource);
router.delete('/:id', deleteResource);

export default router;