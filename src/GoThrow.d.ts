export type GoErr = {
  err: Error;
  data?: undefined
}
export type GoOk<TData> = {
  err?: Error;
  data: TData
}
export type GoUn<TData> = GoErr | GoOk<TData>
