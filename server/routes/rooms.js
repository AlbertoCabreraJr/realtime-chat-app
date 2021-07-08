import mongoose from "mongoose";
import express from "express";
import { RoomModel, MessageModel } from "../models/room.js";

const router = express.Router();

router.get("/:roomID", async (req, res) => {
  try {
    const { roomID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(roomID))
      return res.status(404).json({ message: "Room ID is invalid" });

    const room = await RoomModel.findById(roomID).lean();
    if (room) return res.status(200).json(room.messages);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const { roomName, user, text } = req.body;

  const message = new MessageModel({
    room: roomName,
    user,
    text,
  });

  try {
    const room = await RoomModel.findOne({ name: roomName });

    if (room) {
      room.messages.push(message);
      room.users = room.users.filter((u) => u !== user);
      room.users.push(user);
      room.save();

      return res.status(200).json({ roomID: room._id });
    } else {
      const result = await RoomModel.create({
        name: roomName,
        users: [user],
        messages: [message],
      });
      return res.status(200).json({ roomID: result._id });
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:roomID/:username", async (req, res) => {
  try {
    const { roomID, username } = req.params;

    const room = await RoomModel.findById(roomID);
    if (room) {
      // If usa nlng ka user e delete na as a whole ang room
      const numOfOnline = room.users.length;
      if (numOfOnline === 1) {
        const removedRoom = await RoomModel.findByIdAndRemove(roomID);

        if (!removedRoom) return res.status(200).json({ message: "Success" });
        return;
      }

      // If more than one pa ang online, kay wagtangon ra
      // ang user sa list of online
      room.users = room.users.filter((user) => user !== username);
      room.save();

      // Final check if naa paba jod users
      if (room.users.length === 0) {
        const removedRoom = await RoomModel.findByIdAndRemove(roomID);

        if (!removedRoom) return res.status(200).json({ message: "Success" });
        return;
      }

      return res.status(200).json({ message: "Success" });
    }

    return res.sta;
  } catch (error) {
    console.log(error);
  }
});

export default router;
