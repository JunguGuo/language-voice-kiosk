import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function WelcomePage() {
  return (
    <div className="h-screen grid place-items-center p-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-xl text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold tracking-tight"
        >
          Your Voice. Any Language.
        </motion.h1>
        <p className="text-lg opacity-80">
          Step in, record a short sample, and hear yourself speak another language—instantly.
        </p>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link to="/capture" className="inline-block bg-black text-white px-8 py-4 rounded-2xl shadow">
            Start
          </Link>
        </motion.div>
      </div>
    </div>
  );
}