import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import resourceRoutes from '../../src/routes/resourceRoutes';
import { errorHandler } from '../../src/middleware/errorHandler';
import cors from 'cors';
import helmet from 'helmet';
import Resource from '../../src/models/resourceModel';

describe('Resource Routes', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use('/api/resources', resourceRoutes);
    app.use(errorHandler);
  });

  afterEach(async () => {
    await Resource.deleteMany({});
  });

  describe('POST /api/resources', () => {
    it('should create a resource and return 201', async () => {
      const resourceData = { name: 'Test Resource', description: 'A test resource.' };
      const response = await request(app).post('/api/resources').send(resourceData);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(resourceData);
      expect(response.body).toHaveProperty('_id');
    });

    it('should return 400 for invalid data', async () => {
      const response = await request(app).post('/api/resources').send({ name: '' });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('name');
    });
  });

  describe('GET /api/resources/:id', () => {
    it('should return a resource by ID', async () => {
      const resourceData = { name: 'Test Resource', description: 'A test resource.' };
      const createResponse = await request(app).post('/api/resources').send(resourceData);
      const resourceId = createResponse.body._id;

      const response = await request(app).get(`/api/resources/${resourceId}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(resourceData);
    });

    it('should return 404 for non-existent resource', async () => {
      const response = await request(app).get(`/api/resources/${new mongoose.Types.ObjectId()}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Resource not found');
    });
  });

  describe('PUT /api/resources/:id', () => {
    it('should update a resource and return 200', async () => {
      const resourceData = { name: 'Test Resource', description: 'A test resource.' };
      const createResponse = await request(app).post('/api/resources').send(resourceData);
      const resourceId = createResponse.body._id;

      const updateData = { name: 'Updated Resource', description: 'Updated description.' };
      const response = await request(app).put(`/api/resources/${resourceId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updateData);
    });

    it('should return 404 for non-existent resource', async () => {
      const updateData = { name: 'Updated Resource', description: 'Updated description.' };
      const response = await request(app).put(`/api/resources/${new mongoose.Types.ObjectId()}`).send(updateData);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Resource not found');
    });
  });

  describe('DELETE /api/resources/:id', () => {
    it('should delete a resource and return 204', async () => {
      const resourceData = { name: 'Test Resource', description: 'A test resource.' };
      const createResponse = await request(app).post('/api/resources').send(resourceData);
      const resourceId = createResponse.body._id;

      const response = await request(app).delete(`/api/resources/${resourceId}`);
      expect(response.status).toBe(204);
    });

    it('should return 404 for non-existent resource', async () => {
      const response = await request(app).delete(`/api/resources/${new mongoose.Types.ObjectId()}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Resource not found');
    });
  });

  describe('GET /api/resources', () => {
    it('should list all resources', async () => {
      await request(app).post('/api/resources').send({ name: 'A', description: 'desc A' });
      await request(app).post('/api/resources').send({ name: 'B', description: 'desc B' });

      const response = await request(app).get('/api/resources');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  });
});