import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  room: { type: String, required: true },
  user: { type: String },
  text: { type: String },
});

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: [],
  messages: [messageSchema],
});

export const RoomModel = mongoose.model("Room", roomSchema);
export const MessageModel = mongoose.model("Message", messageSchema);
