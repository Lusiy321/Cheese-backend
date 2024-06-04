/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as TelegramBot from 'node-telegram-bot-api';
import {
  Conflict,
  NotFound,
  BadRequest,
  Unauthorized,
  NotAcceptable,
} from 'http-errors';
import { Booking } from './bookings.model';
import { CreateBookingDto } from './dto/ctreate.booking.dto';

@Injectable()
export class BookingsService {
  private bot: TelegramBot;

  constructor(@InjectModel(Booking.name) private bookingModel: Booking) {
    const token = process.env.TELEGRAM_BOT;
    this.bot = new TelegramBot(token, { polling: false });
    //   this.setupBot();
  }

  async create(booking: CreateBookingDto): Promise<Booking> {
    const { name, phone, start, end, hall } = booking;

    // Проверка на совпадение времени бронирования
    const existingBookings = await this.bookingModel.find({
      hall: hall,
      $or: [
        {
          start: { $lt: end },
          end: { $gt: start },
        },
      ],
    });

    if (existingBookings && existingBookings.length > 0) {
      throw new Conflict(
        'Booking registration failed: This time is already used.',
      );
    }

    if (name && phone && start && end && hall) {
      const createdBooking = await this.bookingModel.create({
        name: name,
        phone: phone,
        start: start,
        end: end,
        hall: hall,
      });
      await createdBooking.save();
      return createdBooking;
    } else {
      throw new BadRequest('All booking details must be provided.');
    }
  }

  async findAll(hall: string): Promise<Booking[]> {
    return this.bookingModel.find({ hall: hall, paid: false }).exec();
  }

  //   private async setupBot() {
  //     this.bot.onText(/\/start/, async (msg: any) => {
  //       const chatId = msg.chat.id;
  //       const user = { name: msg.from.first_name, tg_chat: chatId };
  //       const existUser = await this.userModel.findOne({ tg_chat: chatId });
  //       if (existUser === null) {
  //         await this.create(user);
  //       } else if (existUser.role === 'admin') {
  //         await this.bot.sendMessage(chatId, `Привіт! Admin`, {
  //           reply_markup: {
  //             keyboard: adminGeneralKeyboard,
  //             resize_keyboard: true,
  //           },
  //         });
  //       } else {
  //         await this.bot.sendMessage(
  //           chatId,
  //           `Привіт! ${msg.from.first_name}.\n` + startMsg,
  //           {
  //             reply_markup: {
  //               keyboard: userGeneralKeyboard,
  //               resize_keyboard: true,
  //             },
  //           },
  //         );
  //       }
  //     });
  //   }
}
