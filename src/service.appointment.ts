import type { Appointment } from './entity.appointment'
import type { RepositoryAppointment } from './repository.appointment'

export default function appointmentService (repo: RepositoryAppointment<Appointment>) {
  return {
    async makeNewAppointment (customer: string, startsAt: Date, endsAt: Date) {
      if (startsAt <= new Date()) {
        throw new Error('new appointments in the future only')
      }
      const { id, overlaps } = await repo.insertOne({
        customer,
        endsAt,
        startsAt
      })

      if (overlaps) {
        throw new Error(`there are ${overlaps.length} overlaps`)
      }

      return id ?? '-1'
    }
  }
}