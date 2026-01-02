declare module 'uuid' {
  export function v4(): string;
  export function v1(): string;
  export function v3(name: string | any[], namespace: string | any[]): string;
  export function v5(name: string | any[], namespace: string | any[]): string;
  export function parse(uuid: string): any[];
  export function stringify(buffer: any[]): string;
  export function validate(uuid: string): boolean;
  export function version(uuid: string): number;
}
