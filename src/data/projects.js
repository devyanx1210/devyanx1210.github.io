// To add a new project: import its image, then add an object to the array below.
import esoapp_laptop_audit from "../assets/app_laptop/esoapp_laptop_audit.png";
import esoapp_phone_audit from "../assets/app_phone/esoapp_phone_audit.png";
import aql_laptop_dashboard from "../assets/app_laptop/aql_laptop_dashboard.png"
import aql_phone_dashboard from "../assets/app_phone/aql_phone_dashboard.png"
import rbt_laptop_dashbaord from "../assets/app_laptop/rbt_laptop_dashboard.png"
import rbt_phone_dashboard from "../assets/app_phone/rbt_phone_dashboard.png"

const projects = [
  {
    name: "ESO Auditing System",
    image_desktop: esoapp_laptop_audit,
    image_phone: esoapp_phone_audit,
    description:
      "<span class='project-highlight'>Currently deployed and used by hundreds of engineering students and administrative personnel</span>, this responsive web application modernizes the academic clearance process within the College of Engineering. It features automated obligation notifications, audit tracking, analytics reporting, and auto-fill PDF generation, significantly improving operational efficiency and reducing manual processing."
    , tags: ["React", "TailwindCSS", "Typescript", "MySQL", "Node.js"],
    github: "https://github.com/devyanx1210",
  },
  {
    name: "AquaLasTech",
    image_desktop: aql_laptop_dashboard,
    image_phone: aql_phone_dashboard,
    description:
      "<span class='project-highlight'>Recognized as Top 1 Ranked Software during the Software Design subject defense</span> for its system design, functionality, and practical application. A comprehensive full-stack management system developed for water refilling station operations, facilitating customer order processing, inventory tracking, and business management. It provides real-time sales analytics, automated reporting, and data-driven insights to support efficient decision-making.", tags: ["React", "Node.js", "MySQL", "Tailwind CSS"],
    github: "https://github.com/devyanx1210",
  },
  {
    name: "RoboTilapia App",
    image_desktop: rbt_laptop_dashbaord,
    image_phone: rbt_phone_dashboard,
    description:
      "<span class='project-highlight'>Successfully integrated AI-based computer vision for fish behavior detection and monitoring</span>. An IoT-enabled aquaculture system using Arduino-based sensors to collect real-time water quality data (pH, temperature, ammonia, dissolved oxygen). Provides automated alerts, feed scheduling, and basic analytics for data-driven aquaculture management.", tags: ["React", "Firebase", "IoT"],
    github: "https://github.com/devyanx1210",
  },
];

export default projects;