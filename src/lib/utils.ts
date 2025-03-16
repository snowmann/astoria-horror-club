import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseURL() {
  return process.env.AHC_BASE_URL ? process.env.AHC_BASE_URL : `http://localhost:3000`
}

export function getBlobUrl(url: string) {
  return `https://fzuxxxhgqwm9izz9.public.blob.vercel-storage.com/${url}`
}

export type Loctions = {
  heartOfGold: 'Heart of Gold'
  focalPoint: 'Focal Point Beer Co.'
  shilTavern: 'The Shillelagh Tavern'
}
const locationEnumToString: Loctions = {
  heartOfGold: 'Heart of Gold',
  focalPoint: 'Focal Point Beer Co.',
  shilTavern: 'The Shillelagh Tavern',
}

export const getLocationString = (location: keyof Loctions) => locationEnumToString[location]
