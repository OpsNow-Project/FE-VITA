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

export const formatAge = (isoDate?: string) => {
  if (!isoDate) return "-";
  const diff = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  if (diff >= 86400) {
    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    return `${days}일${hours > 0 ? " " + hours + "시간" : ""} 전`;
  }
  if (diff >= 3600) {
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    return `${hours}시간${minutes > 0 ? " " + minutes + "분" : ""} 전`;
  }
  if (diff >= 60) {
    return `${Math.floor(diff / 60)}분 ${diff % 60}초 전`;
  }
  return `${diff}초 전`;
};
