import { ReactNode } from "react";
import { useView, useDogs } from "../Providers/Contexts";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { favoriteDogs, unfavoriteDogs } = useDogs();
  const { view, setView } = useView();

  const changeView = (newView: string) => {
    newView === view ? setView("allDogs") : setView(newView);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${view === "favoriteDogs" ? "active" : ""}`}
            onClick={() => {
              changeView("favoriteDogs");
            }}
          >
            favorited ( {favoriteDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${view === "unfavoriteDogs" ? "active" : ""}`}
            onClick={() => {
              changeView("unfavoriteDogs");
            }}
          >
            unfavorited ( {unfavoriteDogs.length} )
          </div>
          <div
            className={`selector ${view === "createDog" ? "active" : ""}`}
            onClick={() => {
              changeView("createDog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
