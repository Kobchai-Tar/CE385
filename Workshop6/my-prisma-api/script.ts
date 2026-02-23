import { prisma } from './lib/prisma'

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Kobchai',
            email: '66111810@dpu.ac.th',
        },
    })
    console.log('Create user:', user)
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