export type Pod = {
  name: string;
  status: "Running" | "Pending" | "CrashLoop";
  restarts: number;
  age: string;
  cpu?: string;
  memory?: string;
};
