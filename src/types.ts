export interface Device {
  id: number;
  ip: string;
  userName: string;
  password: string;
}
  
export interface CommandResult {
  output: string;
}
  
export interface Command {
  id: number;
  name: string;
  description: string;
  command: string;
}
