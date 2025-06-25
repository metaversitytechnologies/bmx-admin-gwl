export const HoverIcon = ({
  id,
  hoveredItem,
  setHoveredItem,
  defaultSrc,
  hoverSrc,
  width = 22,
  hoverWidth = 23,
}) => (
  <img
    src={hoveredItem === id ? hoverSrc : defaultSrc}
    width={hoveredItem === id ? hoverWidth : width}
    style={{
      transition: "all 0.3s ease",
      transform: hoveredItem === id ? "scale(1.05)" : "scale(1)",
    }}
    onMouseEnter={() => setHoveredItem(id)}
    onMouseLeave={() => setHoveredItem(null)}
    alt=""
  />
);
