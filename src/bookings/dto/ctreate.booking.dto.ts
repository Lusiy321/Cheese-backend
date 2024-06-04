/* eslint-disable prettier/prettier */
export class CreateBookingDto {
  readonly name: string;
  readonly phone: string;
  readonly start: Date;
  readonly end: Date;
  readonly hall: string;
}
