import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ricky");
});

const channelsShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 30,
    },
  },
  { timestamp: true }
);
const Channel = mongoose.model("channels", channelsShema);

app.get("/channels", async (req, res) => {
  const channels = await Channel.find();
  res.send(channels);
});

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      minLength: 1,
    },
    user: {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channels",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("messages", messageSchema);

app.get("/channels/:id", async (req, res) => {
  const channel = await Channel.findById(req.params.id);
  const messages = await Message.find({ channelId: req.params.id }).sort({
    createdAt: "desc",
  });

  res.send({ channel, messages });
});

app.post("/channels/:id", async (req, res) => {
  console.log(req.body);
  await Message.create({
    text: req.body.text,
    user: {
      name: req.body.username,
      image:
        "https://api.dicebear.com/5.x/adventurer-neutral/svg?seed=Coco" +
        req.body.username,
    },
    channelId: req.params.id,
  });
  res.send("oki");
});

app.listen(3000, async () => {
  await mongoose.connect(
    "mongodb+srv://ricky94:ricky94@cluster0.mbsozhx.mongodb.net/?retryWrites=true&w=majority"
  );
});
