export interface SoundcloudBadgeOptions {
  client_id: string
  song: string
  dark?: boolean
  getFonts?: boolean
}
declare function soundcloudBadge(
  options: SoundcloudBadgeOptions,
  callback: (err: Error, src: string, data: unknown, div: HTMLDivElement) => void
): void
export default soundcloudBadge
