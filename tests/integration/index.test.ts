import dotEnv from 'dotenv'
dotEnv.config({
  path: '.env.test'
})
import express, { Application } from 'express'
import request from 'supertest'
import mongoose from 'mongoose'

const app: Application = express()
import expressApp from '../../src/app'
expressApp(app)

describe('Integration test for test route', () => {
  test('Recieve 200 status code', async () => {
    const res = await request(app).get('/test')
    expect(res.statusCode).toEqual(200)
  })
})

describe('Integration tests for auth routes', () => {
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

  test('Recieve 403 status code when trying to add existing username', async () => {
    const res = await request(app).post('/register')
    .send({
      username: 'Will130785',
      password: 'test',
      confirmPassword: 'test'
    })
    expect(res.statusCode).toEqual(403)
    expect(res.body.msg).toEqual('Username taken')
  })

})

afterAll(async () => {
  await mongoose.disconnect()
})