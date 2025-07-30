import Resource from '../models/resourceModel';
import { CreateResourceInput, UpdateResourceInput } from '../types';

export const createResource = async (data: CreateResourceInput) => {
  const resource = new Resource(data);
  return await resource.save();
};

export const getAllResources = async (filters: Partial<CreateResourceInput>) => {
  return await Resource.find(filters);
};

export const getResourceById = async (id: string) => {
  return await Resource.findById(id);
};

export const updateResource = async (id: string, data: UpdateResourceInput) => {
  return await Resource.findByIdAndUpdate(id, data, { new: true });
};

export const deleteResource = async (id: string) => {
  return await Resource.findByIdAndDelete(id);
};