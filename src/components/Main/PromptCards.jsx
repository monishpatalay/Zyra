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

function PromptCards({ onSelect }) {
  return (
    <div className="cards">
      {CARDS.map((card) => (
        <button
          type="button"
          className="card"
          key={card.text}
          onClick={() => onSelect(card.text)}
        >
          <p>{card.text}</p>
          <span className="card-icon">
            <card.Icon size={20} />
          </span>
        </button>
      ))}
    </div>
  );
}

export default PromptCards;
