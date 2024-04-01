import 'reflect-metadata'

import { createServer } from 'node:http'

import { makeApp } from './app';

(async () => {
  
  const yoga = await makeApp()
  const server = createServer(yoga)
 
  server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql')
  })
})()