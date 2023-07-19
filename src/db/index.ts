import { neon, neonConfig } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { z } from 'zod'

neonConfig.fetchConnectionCache = true

const dataBaseUrl = z.string().url().parse(process.env.DATABASE_URL)

const sql = neon(dataBaseUrl)
export const db = drizzle(sql)
