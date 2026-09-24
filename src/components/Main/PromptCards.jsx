import { motion as Motion, useReducedMotion } from "motion/react";
import { IconBulb, IconCode, IconCompass, IconMessage } from "../icons/Icons";

const CARDS = [
  {
    text: "Suggest beautiful places to see on an upcoming road trip",
    Icon: IconCompass,
  },
  {
    text: "Briefly summarise this concept: urban planning",
    Icon: IconBulb,
  },
  {
    text: "Brainstorm team bonding activities for our work retreat",
    Icon: IconMessage,
  },
  {
    text: "Improve the readability of the following code",
    Icon: IconCode,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

function PromptCards({ onSelect }) {
  const reduceMotion = useReducedMotion();

  return (
    <Motion.div
      className="cards"
      variants={reduceMotion ? undefined : containerVariants}
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
    >
      {CARDS.map((card) => (
        <Motion.button
          type="button"
          className="card"
          key={card.text}
          onClick={() => onSelect(card.text)}
          variants={reduceMotion ? undefined : cardVariants}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          <p>{card.text}</p>
          <span className="card-icon">
            <card.Icon size={20} />
          </span>
        </Motion.button>
      ))}
    </Motion.div>
  );
}

export default PromptCards;
