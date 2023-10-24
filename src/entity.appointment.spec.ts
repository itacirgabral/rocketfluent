import { expect, test } from 'vitest'
import { Appointer } from './entity.appointment'

test('create a appointer', () => {
  const appointer = new Appointer()

  expect(appointer)
    .toBeDefined()
})

test('compile a empty appointment with error', () => {
  const appointment = new Appointer().compile()

  expect(appointment.err)
    .not
    .null
})

test('compile a regular appointment with no error', () => {
  const name = 'John Doe'
  const today = new Date()
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)

  const { err, data } = new Appointer()
    .customerIs(name)
    .startsAt(today)
    .endsAt(tomorrow)
    .compile()

  expect(err).toBeNull
  expect(data?.customer).toBe(name)
  expect(data?.startsAt).toBe(today)
  expect(data?.endsAt).toBe(tomorrow)
})

test('compile a inversed date appointment should throw a error', () => {
  const name = 'John Doe'
  const today = new Date()
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)

  const { err, data } = new Appointer()
    .customerIs(name)
    .startsAt(tomorrow)
    .endsAt(today)
    .compile()

  expect(err).not.null
})