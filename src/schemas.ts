import mongoose, { Schema } from 'mongoose';
import { CanalDocument, ComentarioDocument, LikesVideoDocument, PlaylistDocument, SubscripcionDocument, UserDocument, VideoDocument } from './types';

// Esquema de Usuario
const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  usuario: { type: String, required: true },
  nacimiento: { type: Date, required: true },
  sexo: { type: String, required: true },
  pais: { type: String, required: true },
  cp: { type: String, required: true }
}, { timestamps: true });

// Esquema de Video
const VideoSchema: Schema = new Schema({
  titulo: { type: String, required: true },
  desc: { type: String, required: true },
  size: { type: Number, required: true },
  file: { type: String, required: true },
  duracion: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  status: { type: String, enum: ['public', 'hidden', 'private'], required: true },
  tags: [{ type: String }],
  canalId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

// Esquema de Canal
const ChannelSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  desc: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Esquema de Suscripción
const SubscriptionSchema: Schema = new Schema({
  subsId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  canalId: { type: Schema.Types.ObjectId, ref: 'Channel', required: true },
}, { timestamps: true });

// Esquema de Interacción
const LikesVideoSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
  type: { type: String, enum: ['like', 'dislike'], required: true },
}, { timestamps: true });

// Esquema de Playlist
const PlaylistSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  status: { type: String, enum: ['public', 'private'], required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  videosIds: [{ type: Schema.Types.ObjectId, ref: 'Video' }]
}, { timestamps: true });

// Esquema de Comentario
const CommentSchema: Schema = new Schema({
  texto: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true }
});

// Modelos
export const User = mongoose.model<UserDocument>('User', UserSchema);
export const Video = mongoose.model<VideoDocument>('Video', VideoSchema);
export const Channel = mongoose.model<CanalDocument>('Channel', ChannelSchema);
export const Subscription = mongoose.model<SubscripcionDocument>('Subscription', SubscriptionSchema);
export const LikesVideo = mongoose.model<LikesVideoDocument>('Interaction', LikesVideoSchema);
export const Playlist = mongoose.model<PlaylistDocument>('Playlist', PlaylistSchema);
export const Comment = mongoose.model<ComentarioDocument>('Comment', CommentSchema);
