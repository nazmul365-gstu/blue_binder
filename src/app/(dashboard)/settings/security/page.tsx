import Image from "next/image";
import Link from "next/link";

function ProfileIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="8" r="3.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 19a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5 6 6v5.5c0 4 2.6 6.8 6 9 3.4-2.2 6-5 6-9V6l-6-2.5Z" />
      <circle cx="12" cy="11" r="1.6" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h11l3 3v13H5V4Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 4v5h8V4" />
    </svg>
  );
}

function UserAvatar() {
  return (
    <div className="relative h-12 w-12 overflow-hidden rounded-full">
      <Image src="/profile.png.jpg" alt="Profile" fill className="object-cover" sizes="48px" priority={false} />
    </div>
  );
}

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[130px_1fr]">
        <aside className="rounded-md border border-[#d8deea] bg-[#eef1f7] p-2">
          <Link href="/settings" className="flex w-full items-center gap-2 rounded-[4px] px-2 py-2 text-[10px] text-[#7b8499] transition hover:bg-[#f6f8fc] hover:text-[#2f374d]">
            <ProfileIcon />
            Profile
          </Link>
          <Link href="/settings/security" className="mt-1.5 flex w-full items-center gap-2 rounded-[4px] bg-[#f6f8fc] px-2 py-2 text-[10px] font-medium text-[#1f2433]">
            <ShieldIcon />
            Security
          </Link>
        </aside>

        <section className="rounded-md border border-[#d8deea] bg-[#eef1f7] p-3 sm:p-4">
          <h2 className="text-[14px] font-semibold text-[#1a2031]">Change Password</h2>
          <p className="mt-1 text-[10px] text-[#8b94a7]">Ensure your account uses a strong, unique password</p>

          <form className="mt-3 space-y-2.5">
            <label className="block">
              <span className="mb-1 block text-[10px] text-[#313a52]">Current Password</span>
              <input
                type="password"
                placeholder="Enter your current password"
                className="h-8 w-full rounded-[3px] border border-[#cfd6e4] bg-[#f0f3f8] px-2 text-[10px] text-[#37405a] outline-none placeholder:text-[#9aa4ba]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[10px] text-[#313a52]">New Password</span>
              <input
                type="password"
                placeholder="Enter your new password"
                className="h-8 w-full rounded-[3px] border border-[#cfd6e4] bg-[#f0f3f8] px-2 text-[10px] text-[#37405a] outline-none placeholder:text-[#9aa4ba]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[10px] text-[#313a52]">Confirm New Password</span>
              <input
                type="password"
                placeholder="Enter new password"
                className="h-8 w-full rounded-[3px] border border-[#cfd6e4] bg-[#f0f3f8] px-2 text-[10px] text-[#37405a] outline-none placeholder:text-[#9aa4ba]"
              />
            </label>

            <button
              type="button"
              className="mt-1 inline-flex h-8 items-center gap-1.5 rounded-[3px] bg-[#4237b0] px-3 text-[10px] font-medium text-white transition hover:bg-[#4f44c0]"
            >
              <SaveIcon />
              Update Password
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
