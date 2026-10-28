import { Document, model, models, Schema, Types } from "mongoose";

interface IVote {
  actionId: Types.ObjectId;
  author: Types.ObjectId;
  actionType: "answer" | "question";
  voteType: "upvote" | "downvote";
}

export interface IVoteDoc extends IVote, Document {}

const VoteSchema = new Schema<IVote>(
  {
    actionId: { type: Schema.Types.ObjectId, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    actionType: { type: String, enum: ["answer", "question"], required: true },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true },
  },
  { timestamps: true }
);

VoteSchema.index({ author: 1, actionId: 1, actionType: 1 }, { unique: true });

const Vote = models?.Vote || model<IVote>("Vote", VoteSchema);

export default Vote;
