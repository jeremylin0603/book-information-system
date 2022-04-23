/* eslint-disable @typescript-eslint/no-explicit-any */
export const deepClone = (data: any) => {
  return JSON.parse(JSON.stringify(data))
}
