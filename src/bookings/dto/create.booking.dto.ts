/* eslint-disable prettier/prettier */
export class CreateBookingDto {
  readonly name: string;
  readonly url: string;
  readonly start: Date;
  readonly end: Date;
  readonly hall: string;
}
