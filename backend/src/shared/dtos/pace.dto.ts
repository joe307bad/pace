import { Document } from "mongoose";

export interface PaceDto extends Document {
    currentMile: number;
    mileTime: number;
}