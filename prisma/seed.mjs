import { PrismaClient, Status } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create demo users
  const alice = await prisma.user.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
    },
  })

  const bob = await prisma.user.create({
    data: {
      name: 'Bob Smith',
      email: 'bob@example.com',
    },
  })

  const charlie = await prisma.user.create({
    data: {
      name: 'Charlie Brown',
      email: 'charlie@example.com',
    },
  })

  // Seed OPEN issues
  await prisma.issue.createMany({
    data: [
      {
        title: 'Fix login bug',
        description: 'Users can’t log in after resetting password.',
        status: Status.OPEN,
        assignedToUserId: alice.id,
      },
      {
        title: 'Implement dark mode',
        description: 'Add dark mode toggle for the UI.',
        status: Status.OPEN,
        assignedToUserId: bob.id,
      },
      {
        title: 'Create landing page',
        description: 'Build marketing landing page for new users.',
        status: Status.OPEN,
        assignedToUserId: charlie.id,
      },
      {
        title: 'Add loading spinners',
        description: 'Improve UX by adding loading indicators.',
        status: Status.OPEN,
        assignedToUserId: bob.id,
      },
      {
        title: 'Fix navbar responsiveness',
        description: 'Navbar doesn’t collapse correctly on mobile.',
        status: Status.OPEN,
        assignedToUserId: alice.id,
      },
    ],
  })

  // Seed IN_PROGRESS issues
  await prisma.issue.createMany({
    data: [
      {
        title: 'Improve dashboard performance',
        description: 'Dashboard renders slowly with large data.',
        status: Status.IN_PROGRESS,
        assignedToUserId: bob.id,
      },
      {
        title: 'Migrate to TypeScript',
        description: 'Convert codebase from JavaScript to TypeScript.',
        status: Status.IN_PROGRESS,
        assignedToUserId: charlie.id,
      },
      {
        title: 'Integrate Stripe payments',
        description: 'Add payment gateway using Stripe API.',
        status: Status.IN_PROGRESS,
        assignedToUserId: alice.id,
      },
      {
        title: 'Add forgot password',
        description: 'Email-based password recovery flow.',
        status: Status.IN_PROGRESS,
        assignedToUserId: bob.id,
      },
      {
        title: 'Audit security policies',
        description: 'Check roles, access, and tokens.',
        status: Status.IN_PROGRESS,
        assignedToUserId: charlie.id,
      },
    ],
  })

  // Seed CLOSED issues
  await prisma.issue.createMany({
    data: [
      {
        title: 'Deploy to production',
        description: 'Initial deployment of the app.',
        status: Status.CLOSED,
        assignedToUserId: alice.id,
      },
      {
        title: 'Fix typo on homepage',
        description: 'Corrected a typo in the main banner.',
        status: Status.CLOSED,
        assignedToUserId: bob.id,
      },
      {
        title: 'Update favicon',
        description: 'Replaced default favicon with brand icon.',
        status: Status.CLOSED,
        assignedToUserId: charlie.id,
      },
      {
        title: 'Remove dead links',
        description: 'Cleaned up broken links in footer.',
        status: Status.CLOSED,
        assignedToUserId: bob.id,
      },
      {
        title: 'Add unit tests',
        description: 'Covered core functions with Jest tests.',
        status: Status.CLOSED,
        assignedToUserId: alice.id,
      },
    ],
  })
}

main()
  .then(() => console.log('✅ Seeded 15+ issues across all statuses'))
  .catch((e) => console.error('❌ Seeding error:', e))
  .finally(() => prisma.$disconnect())
