import { Request, Response } from 'express';
import * as resourceService from '../services/resourceService';

export const createResource = async (req: Request, res: Response) => {
  try {
    const resource = await resourceService.createResource(req.body);
    return res.status(201).json(resource);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create resource' });
  }
};

export const listResources = async (req: Request, res: Response) => {
  try {
    const resources = await resourceService.getAllResources(req.query);
    return res.status(200).json(resources);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch resources' });
  }
};

export const getResource = async (req: Request, res: Response) => {
  try {
    const resource = await resourceService.getResourceById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    return res.status(200).json(resource);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch resource' });
  }
};

export const updateResource = async (req: Request, res: Response) => {
  try {
    const updated = await resourceService.updateResource(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update resource' });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    const deleted = await resourceService.deleteResource(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete resource' });
  }
};