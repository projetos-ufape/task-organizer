function ButtonComponent(text, color, type = false) {
  return `<button type="${
    type ? "submit" : "button"
  }" style="padding: 10px 20px; color: white; border: none; border-radius: 5px; cursor: pointer; background-color: ${color};">${text}</button>`;
}

module.exports = { ButtonComponent };