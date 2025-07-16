import { Server } from "socket.io";

let io;
const onlineUsers = new Map();

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);

      // Add this socket to the user's set of sockets
      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
        // Notify others this user came online
        socket.broadcast.emit("userOnline", userId);
      }
      onlineUsers.get(userId).add(socket.id);

      console.log(`${userId} joined their personal room`);
    });

    socket.on("sendMessage", ({ sender, receiver, message, attachments }) => {
      console.log(
        `📤 ${sender} → ${receiver}: ${message || "[No text]"} ${
          attachments ? `(Attachment: ${attachments})` : ""
        }`
      );

      io.to(receiver).emit("receiveMessage", {
        message,
        attachments,
        fromSelf: false,
        sender,
        receiver,
        createdAt: new Date(),
      });

      socket.emit("receiveMessage", {
        message,
        attachments,
        fromSelf: true,
        sender,
        receiver,
        createdAt: new Date(),
      });
    });

    socket.on("messagesSeen", ({ sender, receiver }) => {
      io.to(sender).emit("updateSeenStatus", { from: receiver });
      console.log(`👁️‍🗨️ Seen sent to ${sender} from ${receiver}`);
    });

    socket.on("typing", ({ sender, receiver }) => {
      io.to(receiver).emit("userTyping", { from: sender });
    });

    socket.on("stopTyping", ({ sender, receiver }) => {
      io.to(receiver).emit("userStoppedTyping", { from: sender });
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);

      // Remove this socket from all users' socket sets
      for (const [userId, socketSet] of onlineUsers.entries()) {
        if (socketSet.has(socket.id)) {
          socketSet.delete(socket.id);

          // If no sockets left for this user, they're offline
          if (socketSet.size === 0) {
            onlineUsers.delete(userId);
            socket.broadcast.emit("userOffline", userId);
          }
          break; // done
        }
      }
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

export const getOnlineUsers = () => onlineUsers;
