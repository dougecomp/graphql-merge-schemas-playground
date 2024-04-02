import 'reflect-metadata'

import request from 'supertest'

import { YogaServerInstance } from "graphql-yoga";
import { makeApp } from '../src/app';

describe('GraphQL Merge Schemas', () => {
  let app: YogaServerInstance<{},{}>

  beforeAll(async () => {
    app = await makeApp()
  })

  it('should hit removeRecipe from Typegraphql schema generation', async () => {
    const removeRecipeQuery = `
      mutation {
        removeRecipe(id: "1")
      }
    `
    const res = await request(app)
    .post('/graphql')
    .send({query: removeRecipeQuery})

    expect(res.body.data.removeRecipe).toBeDefined()
  })

  it('should hit removeUser from manual schema generation', async () => {
    const removeUserQuery = `
      mutation {
        removeUser(id: "1")
      }
    `
    const res = await request(app)
    .post('/graphql')
    .send({query: removeUserQuery})

    expect(res.body.data.removeUser).toBeDefined()
  })
})
