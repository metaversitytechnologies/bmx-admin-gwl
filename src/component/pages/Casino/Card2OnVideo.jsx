import CardComp from "./CardComp";

const Card2OnVideo= ({ t1 }) => {
  return (
    <div className="card_shown_on_top">
      <div className="cards_container">
        <CardComp shown={t1?.C1 != "1"} card={t1?.C1 || "1"} />
        <CardComp shown={t1?.C2 != "1"} card={t1?.C2 || "1"} />
        <CardComp shown={t1?.C3 != "1"} card={t1?.C3 || "1"} />
      </div>
    </div>
  );
};

export default Card2OnVideo;
