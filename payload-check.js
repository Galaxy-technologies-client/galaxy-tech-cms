import { getPayload } from 'payload'
import configPromise from '@payload-config'
import 'dotenv/config'

async function run() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({ collection: 'product-models', limit: 100 })
  console.log("Total models:", docs.length)
  docs.forEach(d => console.log(d.name, "| cat:", d.category ? (d.category.name || "id") : "none"))
  process.exit(0)
}
run()
