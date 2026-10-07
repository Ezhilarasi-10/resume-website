import Card from "./Card.jsx";

// Different titles are passed to each Card using props
function App() {
  const titles = [
    "My First Card",
    "React is Fun",
    "Internship Project",
    "Like This Card",
  ];

  return (
    <div className="app">
      <h1>React Like Card</h1>
      <div className="cards">
        {titles.map((title, index) => (
          <Card key={index} title={title} />
        ))}
      </div>
    </div>
  );
}

export default App;
