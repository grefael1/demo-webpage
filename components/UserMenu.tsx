import { auth, signOut } from "@/auth";

export async function UserMenu() {
  const session = await auth();
  if (!session?.user?.email) return null;

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-neutral-500">{session.user.email}</span>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button
          type="submit"
          className="rounded-md border border-neutral-800 px-2.5 py-1 text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
