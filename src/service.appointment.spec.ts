import type { Appointment } from './entity.appointment'
import type { RepositoryAppointment } from './repository.appointment'
import { expect, describe, it } from 'vitest'
import appointment from './service.appointment'

describe('Create appointment', () => {
  let mockRepo: RepositoryAppointment<Appointment>
  it('should create a new appointment', async () => {
    mockRepo = {
      insertOne () {
        return Promise.resolve({
          id: '1'
        })
      }
    }
    const name = 'John Doe'
    const todayLate = new Date()
    todayLate.setTime(todayLate.getTime() + 1000)
    const tomorrow = new Date(todayLate.getTime() + 24 * 60 * 60 * 1000)

    const mockedApp = appointment(mockRepo)

    const sut = await mockedApp.makeNewAppointment(name, todayLate, tomorrow)
    expect(sut).toBe('1')
  })
  it('should found overlaps appointment', async () => {
    const todayLate = new Date()
    todayLate.setTime(todayLate.getTime() + 1000)
    const tomorrow = new Date(todayLate.getTime() + 24 * 60 * 60 * 1000)
    mockRepo = {
      insertOne () {
        return Promise.resolve({
          overlaps: [{
            id: '1',
            customer: 'John saved',
            startsAt: todayLate,
            endsAt: tomorrow
          }]
        })
      }
    }

    const mockedApp = appointment(mockRepo)
    const name = 'John Doe'

    const sutP = () => mockedApp.makeNewAppointment(name, todayLate, tomorrow)
    await expect(sutP).rejects.toThrowError('there are 1 overlaps')
  })
})