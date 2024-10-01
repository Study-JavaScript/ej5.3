import mongoose from "mongoose";

const NOMBRE_BDD = "yoTubeAlgoDB"

export async function connectToDatabase() {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${NOMBRE_BDD}`);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}

