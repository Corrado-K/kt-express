import mongoose from 'mongoose'

export const connectDatabase = async () => {
     try {
          // await new Promise((resolve, reject) => reject(new Error("I'm stuck!")));
          await mongoose.connect(process.env.MONGO_URI!)
          console.log("✅Database Connected🔋");
     } catch (error) {
          console.log("❌Database Error💀");
     }
     
}