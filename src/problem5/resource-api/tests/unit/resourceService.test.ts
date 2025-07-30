import * as resourceService from '../../src/services/resourceService';
import Resource from '../../src/models/resourceModel';
import mongoose from 'mongoose';

jest.mock('../../src/models/resourceModel');

const MockedResource = Resource as jest.Mocked<typeof Resource>;

describe('resourceService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createResource', () => {
    it('should create a resource successfully', async () => {
      const resourceData = { name: 'Test', description: 'desc' };
      const savedResource = { ...resourceData, _id: new mongoose.Types.ObjectId(), createdAt: new Date(), updatedAt: new Date() };
      (Resource as any).mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(savedResource),
      }));

      const result = await resourceService.createResource(resourceData);
      expect(result).toMatchObject(resourceData);
    });
  });

  describe('getAllResources', () => {
    it('should return all resources', async () => {
      const resources = [
        { name: 'A', description: 'desc A' },
        { name: 'B', description: 'desc B' },
      ];
      MockedResource.find = jest.fn().mockResolvedValue(resources) as any;

      const result = await resourceService.getAllResources({});
      expect(result).toEqual(resources);
      expect(MockedResource.find).toHaveBeenCalledWith({});
    });
  });

  describe('getResourceById', () => {
    it('should return a resource by ID', async () => {
      const resource = { _id: 'id', name: 'A', description: 'desc' };
      MockedResource.findById = jest.fn().mockResolvedValue(resource) as any;

      const result = await resourceService.getResourceById('id');
      expect(result).toEqual(resource);
      expect(MockedResource.findById).toHaveBeenCalledWith('id');
    });
  });

  describe('updateResource', () => {
    it('should update a resource', async () => {
      const updated = { _id: 'id', name: 'Updated', description: 'desc' };
      MockedResource.findByIdAndUpdate = jest.fn().mockResolvedValue(updated) as any;

      const result = await resourceService.updateResource('id', { name: 'Updated' });
      expect(result).toEqual(updated);
      expect(MockedResource.findByIdAndUpdate).toHaveBeenCalledWith('id', { name: 'Updated' }, { new: true });
    });
  });

  describe('deleteResource', () => {
    it('should delete a resource', async () => {
      const deleted = { _id: 'id', name: 'A', description: 'desc' };
      MockedResource.findByIdAndDelete = jest.fn().mockResolvedValue(deleted) as any;

      const result = await resourceService.deleteResource('id');
      expect(result).toEqual(deleted);
      expect(MockedResource.findByIdAndDelete).toHaveBeenCalledWith('id');
    });
  });
});