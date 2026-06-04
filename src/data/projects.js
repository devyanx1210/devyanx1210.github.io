// ESO Laptop
import esoapp_laptop_landing from "../assets/app_laptop/esoapp_laptop_landing.png";
import esoapp_laptop_dashboard from "../assets/app_laptop/esoapp_laptop_dashboard.png";
import esoapp_laptop_audit from "../assets/app_laptop/esoapp_laptop_audit.png";
import esoapp_laptop_list from "../assets/app_laptop/esoapp_laptop_list.png";
import esoapp_laptop_student from "../assets/app_laptop/esoapp_laptop_student.png";

// ESO Phone
import esoapp_phone_landing from "../assets/app_phone/esoapp_phone_landing.png";
import esoapp_phone_dashboard from "../assets/app_phone/esoapp_phone_dashboard.png";
import esoapp_phone_audit from "../assets/app_phone/esoapp_phone_audit.png";
import esoapp_phone_list from "../assets/app_phone/esoapp_phone_list.png";
import esoapp_phone_student from "../assets/app_phone/esoapp_phone_student.png";

// AQL Laptop
import aql_laptop_landing from "../assets/app_laptop/aql_laptop_landing.png";
import aql_laptop_dashboard from "../assets/app_laptop/aql_laptop_dashboard.png";
import aql_laptop_customer from "../assets/app_laptop/aql_laptop_customer.png";
import aql_laptop_orders from "../assets/app_laptop/aql_laptop_orders.png";

// AQL Phone
import aql_phone_landing from "../assets/app_phone/aql_phone.png";
import aql_phone_dashboard from "../assets/app_phone/aql_phone_dashboard.png";
import aql_phone_customer from "../assets/app_phone/aql_phone_customer.png";
import aql_phone_inventory from "../assets/app_phone/aql_phone_inventory.png";

// RBT
import rbt_laptop_dashboard from "../assets/app_laptop/rbt_laptop_dashboard.png";
import rbt_phone_dashboard from "../assets/app_phone/rbt_phone_dashboard.png";

const projects = [
  {
    name: "ESO Auditing System",
    images_desktop: [esoapp_laptop_landing, esoapp_laptop_dashboard, esoapp_laptop_audit, esoapp_laptop_list, esoapp_laptop_student],
    images_phone: [esoapp_phone_landing, esoapp_phone_dashboard, esoapp_phone_audit, esoapp_phone_list, esoapp_phone_student],
    description: "<span class='project-highlight'>Currently deployed and used by hundreds of engineering students and administrative personnel</span>, this responsive web application modernizes the academic clearance process within the College of Engineering. It features automated obligation notifications, audit tracking, analytics reporting, and auto-fill PDF generation, significantly improving operational efficiency and reducing manual processing.",
    tags: ["React", "TailwindCSS", "Typescript", "MySQL", "Node.js"],
    github: "https://github.com/devyanx1210/ESO_Auditing_System_v1",
    link: "https://esoauditingsystem.up.railway.app/"
  },
  {
    name: "AquaLasTech",
    images_desktop: [aql_laptop_landing, aql_laptop_dashboard, aql_laptop_customer, aql_laptop_orders],
    images_phone: [aql_phone_landing, aql_phone_dashboard, aql_phone_customer, aql_phone_inventory],
    description: "<span class='project-highlight'>Recognized as Top 1 Ranked Software during the Software Design subject defense</span> for its system design, functionality, and practical application. A comprehensive full-stack management system developed for water refilling station operations, facilitating customer order processing, inventory tracking, and business management. It provides real-time sales analytics, automated reporting, and data-driven insights to support efficient decision-making.",
    tags: ["React", "Node.js", "MySQL", "Tailwind CSS"],
    github: "https://github.com/devyanx1210/AquaLasTech",
    link: "https://aqua-las-tech.vercel.app/"
  },
  {
    name: "RoboTilapia App",
    images_desktop: [rbt_laptop_dashboard],
    images_phone: [rbt_phone_dashboard],
    description: "<span class='project-highlight'>Successfully integrated AI-based computer vision for fish behavior detection and monitoring</span>. An IoT-enabled aquaculture system using Arduino-based sensors to collect real-time water quality data (pH, temperature, ammonia, dissolved oxygen). Provides automated alerts, feed scheduling, and basic analytics for data-driven aquaculture management.",
    tags: ["React", "Firebase", "IoT"],
    github: "https://github.com/devyanx1210/RoboTilapia",
  },
];

export default projects;