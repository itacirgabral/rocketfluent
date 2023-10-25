export type RepositoryAppointment <App> = {
  insertOne: (appointment: App) => Promise<{
    id?: string;
    overlaps?: Array<App>
  }>
}