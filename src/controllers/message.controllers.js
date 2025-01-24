import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.User._id;
        const filtetedUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filtetedUsers);

    } catch (error) {
        console.error("Error in getUsersForSidebar", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.User._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.User._id;

        let imageUrl;
        if (image) {
            // Upload base64 image to cloudinary
            const UploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = UploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // todo: real-time message sending

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessages controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};