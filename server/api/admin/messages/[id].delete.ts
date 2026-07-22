import { eq } from 'drizzle-orm'
import { contactMessages } from '../../../db/schema'

// Suppression définitive d'un message (droit à l'effacement RGPD).
export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) throw createError({ statusCode: 400, message: 'ID invalide.' })

  const db = useDb()
  const existing = db.select().from(contactMessages).where(eq(contactMessages.id, id)).get()
  if (!existing) throw createError({ statusCode: 404, message: 'Message introuvable.' })

  db.delete(contactMessages).where(eq(contactMessages.id, id)).run()
  return { ok: true }
})
