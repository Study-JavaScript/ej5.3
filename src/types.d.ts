import { Document, Schema } from "mongoose";

// Interfaz de Usuario
interface UserDocument extends Document {
    email: string;
    password: string;
    usuario: string;
    nacimiento: Date;
    sexo: "masculino"|"femenino";
    pais: string;
    cp: string;
  }
  
  // Interfaz de Video
  interface VideoDocument extends Document {
    titulo: string;
    desc: string;
    size: number;
    file: string;
    duracion: number;
    thumbnail: string;
    views: number;
    likes: number;
    dislikes: number;
    status: 'public' | 'hidden' | 'private';
    tags: string[];
    canalId: Schema.Types.ObjectId;
  }
  
  // Interfaz de Canal
  interface CanalDocument extends Document {
    nombre: string;
    desc: string;
    userId: Schema.Types.ObjectId;
  }
  
  // Interfaz de Suscripción
  interface SubscripcionDocument extends Document {
    subsId: Schema.Types.ObjectId;
    canalId: Schema.Types.ObjectId;
  }
  
  // Interfaz de Interacción (Like/Dislike)
  interface LikesVideoDocument extends Document {
    userId: Schema.Types.ObjectId;
    videoId: Schema.Types.ObjectId;
    type: 'like' | 'dislike';
  }
  
  // Interfaz de Playlist
  interface PlaylistDocument extends Document {
    nombre: string;
    status: 'public' | 'private';
    userId: Schema.Types.ObjectId;
    videosIds: Schema.Types.ObjectId[];
  }
  
  // Interfaz de Comentario
  interface ComentarioDocument extends Document {
    texto: string;
  //   date: Date;
    userId: Schema.Types.ObjectId;
    videoId: Schema.Types.ObjectId;
  }