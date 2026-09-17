// argon2@0.45.1 ships only a `.d.cts` declaration file, which TypeScript 3.8.3
// (this project's compiler version) cannot resolve. This ambient shim restores
// type resolution for the subset of the API this project uses.
declare module 'argon2' {
  export interface HashOptions {
    hashLength?: number;
    timeCost?: number;
    memoryCost?: number;
    parallelism?: number;
    type?: number;
    version?: number;
    salt?: Buffer;
    associatedData?: Buffer;
    secret?: Buffer;
  }

  export interface VerifyOptions {
    secret?: Buffer;
  }

  export function hash(password: Buffer | string, options?: HashOptions): Promise<string>;
  export function verify(digest: string, password: Buffer | string, options?: VerifyOptions): Promise<boolean>;
}
