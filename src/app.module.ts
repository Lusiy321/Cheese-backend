/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BookingsModule } from './bookings/bookings.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsController } from './bookings/bookings.controller';
import { BookingsService } from './bookings/bookings.service';
import { Booking, BookingSchema } from './bookings/bookings.model';

@Module({
  imports: [
    BookingsModule,
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    MongooseModule.forRoot(process.env.DB_HOST),
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema, collection: 'booking' },
    ]),
  ],
  controllers: [AppController, BookingsController],
  providers: [BookingsService],
})
export class AppModule {}
