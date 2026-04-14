import { db } from '../lib/db.js'

async function main() {
  const email = process.argv[2]?.trim()
  if (!email) {
    console.error('Uso: pnpm tsx src/scripts/activate-user.ts <email>')
    process.exit(1)
  }

  const result = await db.execute({
    sql: `UPDATE users SET activo = 1 WHERE email = ? RETURNING id, email, rol, activo`,
    args: [email],
  })

  if (result.rows.length === 0) {
    console.error(`No se encontró el usuario: ${email}`)
    process.exit(1)
  }

  console.log('Usuario activado:', result.rows[0])
}

main().catch((err) => {
  console.error('Error activando usuario:', err)
  process.exit(1)
})

