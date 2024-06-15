/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Model } from 'mongoose';

export type BookingDocument = Booking & Document;

interface Event {
  description: string;
  price: number;
}

@Schema({ versionKey: false, timestamps: true })
export class Booking extends Model<Booking> {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  url: string;
  @Prop({ type: String, default: 'Бронь' })
  title: string;
  @Prop({ type: Date, required: true })
  start: Date;
  @Prop({ type: Date, required: true })
  end: Date;
  @Prop({ type: String, required: true })
  hall: string;
  @Prop({ type: Boolean, default: false })
  paid: boolean;
  @Prop({ type: Boolean, default: true })
  editable: boolean;
  @Prop({ type: Boolean, default: true })
  startEditable: boolean;
  @Prop({ type: Boolean, default: true })
  durationEditable: boolean;
  @Prop({ type: Event })
  extendedProps: Event;
  @Prop({ type: String, default: 'a' })
  resourceId: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
