/* eslint-disable @typescript-eslint/no-explicit-any */

interface BaseObj {
  [propName: string]: any
}

type BaseRes<D> = Promise<GlobalType.G_AxiosResponse<D>>
