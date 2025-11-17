// src/App.jsx
import ProfileList from "./components/ProfileList";
import StepCounter from "./components/StepCounter";
import ProductInfo from "./components/ProductInfo";
import "./App.css"; // Make sure to import CSS

// Component to wrap each letter in a span for animation
const JumpingText = ({ text }) => {
  return (
    <>
      {text.split('').map((char, index) => (
        <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  );
};

function App() {
  return (
    <div className="app-container">
      <h1>
        <JumpingText text="React Lab Activity" />
      </h1>

      <ProfileList />

      <StepCounter />

      <ProductInfo
        name="Laptop"
        price={999}
        details="A fast laptop with 16GB RAM and 512GB SSD."
      />

      <ProductInfo
        name="PC Setup"
        price={1500}
        details="Full gaming setup with RGB lights, high-end GPU, and dual monitors."
      />
    </div>
  );
}

export default App;