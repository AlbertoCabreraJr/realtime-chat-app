import * as api from "../store/api";

export const SET_ROOM = "SET_ROOM";
export const REMOVE_ROOM = "REMOVE_ROOM";

export const setRoom =
  ({ roomName, user, text }) =>
  async (dispatch) => {
    try {
      const {
        data: { roomID },
      } = await api.createRoom({
        roomName,
        user: user.name,
        text,
      });

      dispatch({ type: SET_ROOM, payload: { roomName, roomID } });
    } catch (error) {
      console.log(error);
    }
  };

export const removeRoom = () => (dispatch) => {
  try {
    dispatch({ type: REMOVE_ROOM });
  } catch (error) {
    console.log(error);
  }
};

export const getRoomMessages = async (room) => {
  try {
    const { data } = await api.getRoom(room.roomID);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async ({ room, user, text }) => {
  try {
    await api.sendMessageRoom({
      roomName: room.roomName,
      user: user.name,
      text,
    });
  } catch (error) {
    console.log(error);
  }
};

export const roomReducer = (
  state = JSON.parse(localStorage.getItem("room")),
  { type, payload }
) => {
  switch (type) {
    case SET_ROOM:
      localStorage.setItem(
        "room",
        JSON.stringify({ roomName: payload.roomName, roomID: payload.roomID })
      );
      return payload;

    case REMOVE_ROOM:
      localStorage.removeItem("room");
      return null;

    default:
      return state;
  }
};
