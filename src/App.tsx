import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { CreateDogForm } from "./Components/CreateDogForm";
import { useView } from "./Providers/Contexts";

export function App() {
  const { view } = useView();

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        {view !== "createDog" ? <Dogs /> : <CreateDogForm />}
      </Section>
    </div>
  );
}
