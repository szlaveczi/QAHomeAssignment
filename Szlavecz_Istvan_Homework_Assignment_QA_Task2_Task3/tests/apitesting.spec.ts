import { test, expect } from '@playwright/test';

test.describe.serial('TASK_3: Create a test suite for endpoints', () => {
  const BASE_URL = 'https://api.testapi.com'; // Replace with actual API base URL
  let createdTaskId: string | number;

  test('API_TEST_1: POST /tasks - Create a new task', async ({ request }) => {
    const newTaskPayload = {
      title: 'ALDI QA Homework Assignment',
      description: 'Implement Playwright API tests for endpoints',
      status : 'OPEN'
    };

    const response = await request.post(`${BASE_URL}/tasks`, {
      data: newTaskPayload,
    });

    expect(response.status()).toBe(201);

    // Verify response body structure and values
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.title).toBe(newTaskPayload.title);
    expect(responseBody.description).toBe(newTaskPayload.description);
    expect(responseBody.status).toBe(newTaskPayload.status)

    // Store the generated task ID for subsequent tests
    createdTaskId = responseBody.id;
  });

  test('API_TEST_2: GET /tasks/{id} - Retrieve a task by ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/tasks/${createdTaskId}`);

    expect(response.status()).toBe(200);

    // Verify retrieved task matches the created one
    const responseBody = await response.json();
    expect(responseBody.id).toBe(createdTaskId);
    expect(responseBody.title).toBe('ALDI QA Homework Assignment');
    expect(responseBody.status).toBe('OPEN')
  });

  test('API_TEST_3: PUT /tasks/{id} - Update an existing task by ID', async ({ request }) => {
    const updatedTaskPayload = {
      title: 'ALDI QA Homework Assignment - Reviewed',
      description: 'Endpoints verified successfully',
      status: 'DONE'
    };

    const response = await request.put(`${BASE_URL}/tasks/${createdTaskId}`, {
      data: updatedTaskPayload,
    });

    expect(response.status()).toBe(200);


    const responseBody = await response.json();
    expect(responseBody.id).toBe(createdTaskId);
    expect(responseBody.title).toBe(updatedTaskPayload.title);
    expect(responseBody.description).toBe(updatedTaskPayload.description);
    expect(responseBody.status).toBe(updatedTaskPayload.status)
  });

  test('API_TEST_4: DELETE /tasks/{id} - Delete a task by ID', async ({ request }) => {
    const deleteResponse = await request.delete(`${BASE_URL}/tasks/${createdTaskId}`);

    // Verify 204 No Content (or 200 OK depending on API specification)
    expect([200, 204]).toContain(deleteResponse.status());

    // Verify the task can no longer be retrieved (404 Not Found)
    const getResponse = await request.get(`${BASE_URL}/tasks/${createdTaskId}`);
    expect(getResponse.status()).toBe(404);
  });
});