"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { UserAvatar, useUserProfile } from "@/components/user-profile-provider";

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

export default function SettingsPage() {
  const { profile, updateProfile, setAvatarFromFile } = useUserProfile();
  const [fullName, setFullName] = useState(profile.fullName);
  const [phone, setPhone] = useState(profile.phone);
  const [organization, setOrganization] = useState(profile.organization);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const saveStatusTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setFullName(profile.fullName);
    setPhone(profile.phone);
    setOrganization(profile.organization);
  }, [profile.fullName, profile.phone, profile.organization]);

  async function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    await setAvatarFromFile(file);
    event.target.value = "";
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateProfile({
      fullName,
      phone,
      organization,
    });

    setSaveStatus("Successfully updated");
    if (saveStatusTimeoutRef.current) {
      window.clearTimeout(saveStatusTimeoutRef.current);
    }
    saveStatusTimeoutRef.current = window.setTimeout(() => {
      setSaveStatus(null);
    }, 2500);
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[130px_1fr]">
        <aside className="rounded-md border border-[#d8deea] bg-[#eef1f7] p-2">
          <Link href="/settings" className="flex w-full items-center gap-2 rounded-[4px] bg-[#f6f8fc] px-2 py-2 text-[10px] font-medium text-[#1f2433]">
            <ProfileIcon />
            Profile
          </Link>
          <Link href="/settings/security" className="mt-1.5 flex w-full items-center gap-2 rounded-[4px] px-2 py-2 text-[10px] text-[#7b8499] transition hover:bg-[#f6f8fc] hover:text-[#2f374d]">
            <ShieldIcon />
            Security
          </Link>
        </aside>

        <section className="rounded-md border border-[#d8deea] bg-[#eef1f7] p-3 sm:p-4">
          <h2 className="text-[14px] font-semibold text-[#1a2031]">Profile Settings</h2>
          <p className="mt-1 text-[10px] text-[#8b94a7]">Update your personal information and credentials</p>

          <div className="mt-3">
            <p className="text-[11px] text-[#273049]">Profile Picture</p>
            <div className="mt-1.5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-[#d6def0] transition hover:ring-[#4237b0]"
                aria-label="Change profile picture"
              >
                <UserAvatar className="h-12 w-12" />
                <span className="absolute bottom-[2px] right-[2px] grid h-3.5 w-3.5 place-items-center rounded-full bg-[#4237b0] text-white shadow-[0_2px_6px_rgba(66,55,176,0.35)] transition group-hover:scale-105">
                  <svg className="h-2.25 w-2.25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h4l2-2h4l2 2h4v12H4V7Z" />
                    <circle cx="12" cy="13" r="3.2" />
                  </svg>
                </span>
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>
          </div>

          <form className="mt-3 space-y-2.5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-1 block text-[10px] text-[#313a52]">Full Name</span>
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="h-8 w-full rounded-[3px] border border-[#cfd6e4] bg-[#f0f3f8] px-2 text-[10px] text-[#37405a] outline-none placeholder:text-[#9aa4ba]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[10px] text-[#313a52]">Email Address</span>
              <input
                type="email"
                value={profile.email}
                readOnly
                className="h-8 w-full cursor-not-allowed rounded-[3px] border border-[#d9dfea] bg-[#e8edf6] px-2 text-[10px] text-[#637088] outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[10px] text-[#313a52]">Phone Number</span>
              <input
                type="text"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="h-8 w-full rounded-[3px] border border-[#cfd6e4] bg-[#f0f3f8] px-2 text-[10px] text-[#37405a] outline-none placeholder:text-[#9aa4ba]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[10px] text-[#313a52]">Organization</span>
              <input
                type="text"
                value={organization}
                onChange={(event) => setOrganization(event.target.value)}
                className="h-8 w-full rounded-[3px] border border-[#cfd6e4] bg-[#f0f3f8] px-2 text-[10px] text-[#37405a] outline-none placeholder:text-[#9aa4ba]"
              />
            </label>

            <button
              type="submit"
              className="mt-1 inline-flex h-8 items-center gap-1.5 rounded-[3px] bg-[#4237b0] px-3 text-[10px] font-medium text-white transition hover:bg-[#4f44c0]"
            >
              <SaveIcon />
              Save Changes
            </button>
            {saveStatus && <p className="text-[10px] font-medium text-[#1f8a4c]">{saveStatus}</p>}
          </form>
        </section>
      </div>
    </div>
  );
}
