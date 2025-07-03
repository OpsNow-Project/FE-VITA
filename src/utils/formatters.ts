// 바이트를 GB로 변환
export function bytesToGB(bytes: number) {
  return (bytes / 1024 / 1024 / 1024).toFixed(2);
}

// 바이트를 보기 좋은 단위로 변환
export function formatBytes(bytes: number) {
  if (bytes > 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + " MB";
  if (bytes > 1024) return (bytes / 1024).toFixed(2) + " KB";
  return bytes.toFixed(2) + " B";
}
