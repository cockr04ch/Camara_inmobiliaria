import { createClient } from '@libsql/client'
import { env } from '../config/env.js'

/**
 * Cliente de Turso/LibSQL singleton.
 * Se conecta usando TURSO_DATABASE_URL + TURSO_AUTH_TOKEN del .env
 * Para desarrollo local puedes usar:
 *   TURSO_DATABASE_URL=file:./dev.db
 *   TURSO_AUTH_TOKEN=   (vacío)
 */
export const db = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN
})
