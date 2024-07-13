const { PrismaClient, Role } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'Admin',
      email: 'admin@admin.com',
      hashedPassword: '$argon2id$v=19$m=16,t=2,p=1$ZVAwZ28ydnpVRFVCeDMxdA$KqojsLyjscvIC9/zp2DxQg', // 12345678
      role: Role.ADMIN,
    }
  })
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

