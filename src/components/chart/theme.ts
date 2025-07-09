export const COLORS = {
  green: "#299c46",
  orange: "#e5ac0e",
  blue: "#0b6ac7",
  purple: "#8b1e9f",
  red: "#c73e3e",
  teal: "#179c8a",
  yellow: "#e5ac0e",
  pink: "#d63384",
};

// HTTP 요청 경로별 고정 색상 매핑
export const HTTP_PALETTE: Record<string, string> = {
  "/": COLORS.green,
  "/**": COLORS.orange,
  "/actuator/prometheus": COLORS.blue,
  "/api/load/cpu/start": COLORS.purple,
  "/api/load/cpu/stop": COLORS.red,
  "/api/load/disk/start": COLORS.teal,
  "/api/load/disk/stop": COLORS.yellow,
  "/api/load/stop-all": COLORS.pink,
};
export function formatValue(value: number, unit: string) {
  return `${value.toFixed(2)}${unit}`;
}
