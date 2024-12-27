import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
//Agregar datos base, referencia desde método creado en beta.service.ts
async function main() {

}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

/**
 * Agregar esto a package.json:
 * "prisma": {
    "seed": "ts-node --transpile-only prisma/seed.ts"
  },
 */