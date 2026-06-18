import { rest } from 'msw';
import type { BacklogItem } from '../types/backlog';

const mockBacklogItems: BacklogItem[] = [
  {
    id: 1,
    uuid: 'uuid-1',
    title: 'Feature 1',
    description: 'Description 1',
    type: 'feature',
    status: 'idea',
    priority: 50,
    createdById: 1,
    createdBy: { email: 'user@example.com' },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    deletedAt: null,
  },
  {
    id: 2,
    uuid: 'uuid-2',
    title: 'Bug 1',
    description: 'Description 2',
    type: 'bug',
    status: 'in_progress',
    priority: 80,
    createdById: 1,
    createdBy: { email: 'user@example.com' },
    createdAt: '2026-01-02T00:00:00Z',
    updatedAt: '2026-01-02T00:00:00Z',
    deletedAt: null,
  },
];
const Uri = 'https://localhost:7166/api/backlog'; 

export const handlers = [
  // GET all backlog
  rest.get(Uri, (req, res, ctx) => {
    return res(ctx.json(mockBacklogItems));
  }),

  // GET backlog by id
  rest.get(`${Uri}/:id`, (req, res, ctx) => {
    const id = Number(req.params.id);
    const item = mockBacklogItems.find((i) => i.id === id);
    if (!item) {
      return res(ctx.status(404));
    }
    return res(ctx.json(item));
  }),

  // POST create backlog
  rest.post(Uri, (req, res, ctx) => {
    const newItem: BacklogItem = {
      ...req.body,
      id: 3,
      uuid: 'uuid-3',
      createdById: 1,
      createdBy: { email: 'user@example.com' },
      createdAt: '2026-01-03T00:00:00Z',
      updatedAt: '2026-01-03T00:00:00Z',
      deletedAt: null,
    };
    return res(ctx.json(newItem), ctx.status(201));
  }),

  // PUT update backlog
  rest.put(`${Uri}/:id`, (req, res, ctx) => {
    const id = Number(req.params.id);
    const updatedItem = {
      ...req.body,
      id,
      uuid: 'uuid-1',
      createdById: 1,
      createdBy: { email: 'user@example.com' },
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-10T00:00:00Z',
      deletedAt: null,
    };
    return res(ctx.json(updatedItem));
  }),

  // DELETE backlog
  rest.delete(`${Uri}/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // GET backlog by type
  rest.get(`${Uri}/type/:type`, (req, res, ctx) => {
    const type = req.params.type as string;
    const filtered = mockBacklogItems.filter((i) => i.type === type);
    return res(ctx.json(filtered));
  }),

  // GET backlog by status
  rest.get(`${Uri}/status/:status`, (req, res, ctx) => {
    const status = req.params.status as string;
    const filtered = mockBacklogItems.filter((i) => i.status === status);
    return res(ctx.json(filtered));
  }),
];