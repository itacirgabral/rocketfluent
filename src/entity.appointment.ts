
import { GoUn } from './GoThrow'

export interface Appointment {
  customer: string;
  startsAt: Date;
  endsAt: Date
}

export class Appointer {
  private readonly props: Partial<Appointment> = {}

  customerIs (name: string) {
    this.props.customer = name
    return this
  }

  startsAt (date: Date) {
    this.props.startsAt = date
    return this
  }

  endsAt (date: Date) {
    this.props.endsAt = date
    return this
  }

  compile (): GoUn<Appointment>   {
    if (this.props.customer == null) {
      return {
        err: new Error('customer is empty')
      }
    }
    if (this.props.startsAt == null) {
      return {
        err: new Error('startsAt is empty')
      }
    }
    if (this.props.endsAt == null) {
      return {
        err: new Error('endsAt is empty')
      }
    }
    if (this.props.endsAt <= this.props.startsAt) {
      return {
        err: new Error('endsAt is not greater than startsAt')
      }
    }

    const appointment: Appointment = {
      customer: this.props.customer,
      startsAt: this.props.startsAt,
      endsAt: this.props.endsAt
    }

    return {
      data: appointment
    }
  }
}
