import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const FeedbackModal = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // You can send this to backend / firebase later
    const feedbackData = {
      rating,
      message,
      submittedAt: new Date().toISOString(),
    };

    console.log("Feedback submitted:", feedbackData);

    // ✅ Close popup after submit
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-[90%] max-w-md shadow-xl relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">😄</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              We’d love your feedback!
            </h2>
            <p className="text-sm text-gray-600 dark:text-zinc-400">
              Help us improve your experience
            </p>
          </div>

          {/* Rating */}
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl transition-transform ${
                  rating >= star ? "scale-110" : "opacity-40"
                }`}
              >
                ⭐
              </button>
            ))}
          </div>

          {/* Feedback Text */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What did you like or what can we improve?"
            className="w-full p-3 rounded-lg border dark:border-zinc-700 dark:bg-zinc-800 dark:text-white resize-none mb-4"
            rows={4}
          />

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
            >
              Submit
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeedbackModal;
