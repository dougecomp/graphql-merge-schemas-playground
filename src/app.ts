import path from 'node:path'
// import fs from 'node:fs'
import {createServer} from 'node:http'

// import { print } from 'graphql'
import { buildSchema } from "type-graphql";
import { mergeSchemas } from '@graphql-tools/schema'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { createYoga, createSchema } from 'graphql-yoga'

import { RecipeResolver } from "./recipe-resolver";
import { Mutation } from './mutations'
import { Query } from './queries'

export async function makeApp () {
  const typeGraphQLSchemaFileName = 'type-graphql-schema.graphql'
  const typeGraphQLSchema = await buildSchema({
    resolvers: [RecipeResolver],
    emitSchemaFile: typeGraphQLSchemaFileName
  });

  const typesArray = loadFilesSync(path.join(__dirname, '..', '*.graphql'))
  const typeDefs = mergeTypeDefs(typesArray)

  const yogaSchema = createSchema({
    typeDefs: typeDefs,
    resolvers: {
      Mutation,
      Query
    }
  })

  const mergedSchema = mergeSchemas({ schemas:
    [
      typeGraphQLSchema,
      yogaSchema
    ]
  })
  
  const yoga = createYoga({ 
    schema: mergedSchema
  })
  return yoga
}