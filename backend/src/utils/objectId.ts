import { Types } from "mongoose";

export function toObjectId(value: string) {
  return new Types.ObjectId(value);
}
