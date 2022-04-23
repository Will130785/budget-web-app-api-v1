import dotEnv from 'dotenv'
dotEnv.config({
  path: '.env.test'
})
import express, { Application } from 'express'
import request from 'supertest'
import mongoose from 'mongoose'
import passport from 'passport'
import('../../src/app/middleware/passport')
const { JWT_SECRET } = process.env
import { generateClientJWTToken } from '../../src/auth/auth'

const app: Application = express()
import expressApp from '../../src/app'
expressApp(app)

// Global variables
let token: string

describe('Integration test for test route', () => {
  test('Recieve 200 status code', async () => {
    const res = await request(app).get('/test')
    expect(res.statusCode).toEqual(200)
  })
})

describe('Integration tests for auth routes', () => {
  // Register
  test('Recieve 400 status code when no data sent', async () => {
    const res = await request(app).post('/register')
    expect(res.statusCode).toEqual(400)
  })

  test('Recieve 400 status code when passwords dont match', async () => {
    const res = await request(app).post('/register')
    .send({
      username: 'Will130785',
      password: 'test',
      confirmPassword: 'test123'
    })
    expect(res.statusCode).toEqual(400)
  })

  test('Recieve 201 status code', async () => {
    const res = await request(app).post('/register')
    .send({
      username: 'Will130785',
      password: 'test',
      confirmPassword: 'test'
    })
    expect(res.statusCode).toEqual(201)
  })

  test('Recieve 200 status code when trying to add existing username', async () => {
    const res = await request(app).post('/register')
    .send({
      username: 'Will130785',
      password: 'test',
      confirmPassword: 'test'
    })
    expect(res.statusCode).toEqual(200)
    expect(res.body.msg).toEqual('Username taken')
  })

  // Login
  test('Recieve 400 status when no data sent', async () => {
    const res = await request(app).post('/login')
    expect(res.statusCode).toEqual(400)
  })
  
  test('Recieve 403 status code for wrong username', async () => {
    const res = await request(app).post('/login')
    .send({
      username: 'will2345',
      password: 'test'
    })
    expect(res.statusCode).toEqual(403)
  })

  test('Receive 403 status code for wrong password', async () => {
    const res = await request(app).post('/login')
    .send({
      username: 'Will130785',
      password: 'testtt'
    })
    expect(res.statusCode).toEqual(403)
  })

  test('Recieve 201 status code on successful login', async () => {
    const res = await request(app).post('/login')
    .send({
      username: 'Will130785',
      password: 'test'
    })
    expect(res.statusCode).toEqual(201)
    token = res.body.token
  })
})

describe('Integration tests for budget routes', () => {
  test('recieve 400 status when no data sent', async () => {
    const res = await request(app).post('/budget')
    .set({
      Authorization: `Bearer ${token}`
    })
    expect(res.statusCode).toEqual(400)
  })

  test('recieve 201 status code when added record', async () => {
    const res = await request(app).post('/budget')
    .send({
      title: 'Test budget',
      timeline: 'April to May',
      amount: 2000,
      current: true
    })
    .set({
      Authorization: `Bearer ${token}`
    })
    expect(res.statusCode).toEqual(201)
  })

  test('receive 200 status code if record with same name exists', async () => {
    const res = await request(app).post('/budget')
    .send({
      title: 'Test budget',
      timeline: 'April to May',
      amount: 2000,
      current: true
    })
    .set({
      Authorization: `Bearer ${token}`
    })
    expect(res.statusCode).toEqual(200)
  })

  test('test for retrieving all budget records', async () => {
    const res = await request(app).get('/budget')
    .set({
      Authorization: `Bearer ${token}`
    })
    expect(res.statusCode).toEqual(200)
  })
})

describe('Integration tests for adding category route', () => {
  test('recieve 400 status code when no data sent', async () => {
    const res = await request(app).post('/category')
    .set({
      Authorization: `Bearer ${token}`
    })
    expect(res.status).toEqual(400)
  })

  test('recieve 201 status code for successfully added category', async () => {
    const res = await request(app).post('/category')
    .send({
      title: 'Test 1',
      amount: 400,
      currentBudger: 'Test budget'
    })
    .set({
      Authorization: `Bearer ${token}`
    })
    expect(res.statusCode).toEqual(201)
  })

  test('receive 200 error if category already exists', async () => {
    const res = await request(app).post('/category')
    .send({
      title: 'Test 1',
      amount: 400,
      currentBudget: 'Test budget'
    })
    .set({
      Authorization: `Bearer ${token}`
    })
    expect(res.statusCode).toEqual(200)
  })
})

afterAll(async () => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
})