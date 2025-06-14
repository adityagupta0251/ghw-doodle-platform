import CanvasComponents from "./CanvasComponents";
const App = () => {
  return (
    <main>
      <h1 style={
        {
          textAlign: "center",
          color: "black",
          marginBottom: "20px",

        }
      }>Doodle Canvas</h1>
      <CanvasComponents />

    </main>
  );
};
export default App;
