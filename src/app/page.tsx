import { db } from '@/db'
import { users } from '@/db/schema'
import { revalidatePath } from 'next/cache'

export default async function Home() {
  const allUsers = await db.select().from(users)

  async function addItem(data: FormData) {
    'use server'

    const fullName = data.get('full_name')?.toString()
    const phone = data.get('phone')?.toString()

    await db.insert(users).values({
      fullName,
      phone,
    })

    revalidatePath('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-900 text-zinc-50">
      <p>{JSON.stringify(allUsers, null, 2)}</p>
      <form action={addItem} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Full name"
          name="full_name"
          className="rounded border border-zinc-700 bg-transparent p-2"
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          className="rounded border border-zinc-700 bg-transparent p-2"
        />

        <button type="submit" className="rounded bg-cyan-600 px-3 py-2">
          Create
        </button>
      </form>
    </div>
  )
}
