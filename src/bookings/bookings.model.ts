/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Model } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({ versionKey: false, timestamps: true })
export class Booking extends Model<Booking> {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: Date, required: true })
  start: Date;
  @Prop({ type: Date, required: true })
  end: Date;

  @Prop({ type: String, required: true })
  hall: string;
  @Prop({ type: Boolean, default: false })
  paid: boolean;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
