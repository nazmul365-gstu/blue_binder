"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type UserProfile = {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  avatarSrc: string;
};

type UserProfileContextValue = {
  profile: UserProfile;
  updateProfile: (nextProfile: Partial<Omit<UserProfile, "avatarSrc">>) => void;
  setAvatarFromFile: (file: File) => Promise<void>;
};

const STORAGE_KEY = "dashboard-user-profile";

const defaultProfile: UserProfile = {
  fullName: "Dr. Jon Kabir",
  email: "dr.jon.kabir@hospital.com",
  phone: "+1 (555) 123-4567",
  organization: "AeroVision Inc.",
  avatarSrc: "/profile.png.jpg",
};

const UserProfileContext = createContext<UserProfileContextValue | null>(null);

function isUserProfile(value: unknown): value is UserProfile {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.fullName === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.phone === "string" &&
    typeof candidate.organization === "string" &&
    typeof candidate.avatarSrc === "string"
  );
}

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isHydrated, setIsHydrated] = useState(false);

  function persistProfile(nextProfile: UserProfile) {
    setProfile(nextProfile);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProfile));
    } catch {
      // Ignore storage failures and keep the in-memory profile updated.
    }
  }

  useEffect(() => {
    try {
      const storedProfile = window.localStorage.getItem(STORAGE_KEY);
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile) as unknown;
        if (isUserProfile(parsedProfile)) {
          setProfile(parsedProfile);
        }
      }
    } catch {
      setProfile(defaultProfile);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile, isHydrated]);

  const value = useMemo<UserProfileContextValue>(
    () => ({
      profile,
      updateProfile: (nextProfile) => {
        persistProfile({
          ...profile,
          ...nextProfile,
        });
      },
      setAvatarFromFile: async (file) => {
        const avatarSrc = await readFileAsDataUrl(file);
        persistProfile({
          ...profile,
          avatarSrc,
        });
      },
    }),
    [profile],
  );

  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>;
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }

  return context;
}

export function UserAvatar({ className = "h-9 w-9" }: { className?: string }) {
  const { profile } = useUserProfile();

  return (
    <div className={`relative overflow-hidden rounded-full ring-1 ring-white/70 ${className}`}>
      <img src={profile.avatarSrc} alt={`${profile.fullName} profile`} className="h-full w-full object-cover" />
    </div>
  );
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Unable to read file"));
    };
    reader.onerror = () => reject(new Error("Unable to read file"));
    reader.readAsDataURL(file);
  });
}
