import React from "react";

export default function Projects() {
  const [projects, setProjects] = useState([
    "RoboTilapia App",
    "Alcapay App",
    "Monitree App",
  ]);
  return (
    <>
      {" "}
      <div className="projects">
        <section>
          <div>
            <h1>
              My <h1>Projects</h1>
            </h1>
            <p>See projects on github</p>
          </div>
          <div className="projects-nav">
            {projects.map((proj, i) => (
              <h1>{proj}</h1>
            ))}
          </div>
        </section>
        <section>s</section>
      </div>
    </>
  );
}
