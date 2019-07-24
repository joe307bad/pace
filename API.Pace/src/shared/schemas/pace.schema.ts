import * as mongoose from 'mongoose';

export const PaceSchema = new mongoose.Schema({
  currentMile: Number,
  mileTime: Number
});