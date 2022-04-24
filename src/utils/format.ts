/* eslint-disable @typescript-eslint/no-explicit-any */

// [WARNING] only can clone Primitive and Object Type without Function.
export const deepClone = <T = any>(data: T): T => {
  return JSON.parse(JSON.stringify(data))
}
