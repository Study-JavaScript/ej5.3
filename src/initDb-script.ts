// initDatabase.ts
import { connectToDatabase } from './lib';
import { Channel, Comment, LikesVideo, Playlist, Subscription, User, Video } from './schemas';
import { UserDocument, VideoDocument, CanalDocument, SubscripcionDocument, LikesVideoDocument, PlaylistDocument, ComentarioDocument } from './types.d';
import mongoose from 'mongoose';

async function initDatabase() {
  try {
    await connectToDatabase();
    const user: UserDocument = new User({
      email: 'usuario@ejemplo.com',
      password: 'contraseñaSegura123',
      usuario: 'UsuarioEjemplo',
      nacimiento: new Date('1990-01-01'),
      sexo: 'masculino',
      pais: 'España',
      cp: '28001'
    });
    await user.save();

    const canal: CanalDocument = new Channel({
      nombre: 'Canal de Ejemplo',
      desc: 'Este es un canal de ejemplo',
      userId: user._id
    });
    await canal.save();

    const video: VideoDocument = new Video({
      titulo: 'Video de Ejemplo',
      desc: 'Este es un video de ejemplo',
      size: 1024 * 1024 * 50, // 50 MB
      file: 'ejemplo.mp4',
      duracion: 300, // 5 minutos
      thumbnail: 'ejemplo-thumbnail.jpg',
      views: 0,
      likes: 0,
      dislikes: 0,
      status: 'public',
      tags: ['ejemplo', 'test'],
      canalId: canal._id
    });
    await video.save();

    const playlist: PlaylistDocument = new Playlist({
      nombre: 'Playlist de Ejemplo',
      status: 'public',
      userId: user._id,
      videosIds: [video._id]
    });
    await playlist.save();

    const comentario: ComentarioDocument = new Comment({
      texto: 'Este es un comentario de ejemplo',
      userId: user._id,
      videoId: video._id
    });
    await comentario.save();

    const likesVideo: LikesVideoDocument = new LikesVideo({
      userId: user._id,
      videoId: video._id,
      type: 'like'
    });
    await likesVideo.save();

    const subscripcion: SubscripcionDocument = new Subscription({
      subsId: user._id,
      canalId: canal._id
    });
    await subscripcion.save();

    console.log('Base de datos inicializada con datos de ejemplo');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Conexión a la base de datos cerrada');
  }
}

initDatabase();