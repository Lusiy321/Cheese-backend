import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create.booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(@Body() booking: CreateBookingDto) {
    return this.bookingsService.create(booking);
  }

  @Get(':hall')
  async findAll(@Param('hall') hall: string) {
    return this.bookingsService.findAll(hall);
  }
}
