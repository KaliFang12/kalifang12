export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  details: string;
  thumbnail: string;
  image: string;
  topics: string[];
  links: ProjectLink[];
  featured?: boolean;
  startDate?: string;
  endDate?: string;
};

export const projects: Project[] = [
  {
    slug: "blood-pressure-monitor",
    title: "Accurate Blood Pressure Monitor",
    shortDescription:
      "Designed and implemented a blood pressure monitoring system that delivers clinical-grade accuracy in a compact, user-friendly device.",
    details:
      "Designed and built a wearable blood pressure monitor as a Major Qualifying Project, handling both the hardware and firmware end-to-end. Soldered a custom PCB integrating an ESP32 microcontroller, MPRLS pressure sensor, PPG pulse sensor, H-bridge motor driver, and air pump into a single compact board. Wrote firmware in C++ using PlatformIO implementing a closed-loop pneumatic control system, IIR signal filtering, oscillometric beat detection, and real-time systolic/diastolic readings displayed on a TFT screen via a two-ESP32 UART architecture.",
    thumbnail: "MQP-self-test.jpg",
    image: "MQP-self-test.jpg",
    startDate: "Aug 2025",
    endDate: "May 2026",
    featured: true,
    topics: ["C/C++", "PlatformIO", "ESP32", "MPRLS", "H-bridge", "Custom PCB", "TFT Display", "GitHub"],
    links: [],
  },
  {
    slug: "slam-robot-navigation",
    title: "SLAM: Autonomous Robot Navigation System",
    shortDescription:
      "A SLAM-based navigation system for autonomous robots, enabling real-time mapping and localization in dynamic environments.",
    details:
      "The SLAM: Autonomous Robot Navigation System is designed to provide robust and efficient navigation capabilities for autonomous robots. It utilizes Simultaneous Localization and Mapping (SLAM) techniques to create accurate maps of the environment while keeping track of the robot's position. This system is ideal for applications such as warehouse automation, delivery robots, and exploration in unknown terrains.",
    thumbnail: "turtlebot3.jpg",
    image: "turtlebot3.jpg",
    startDate: "Mar 2026",
    endDate: "May 2026",
    featured: true,
    topics: ["Linux", "GitHub","C/C++", "ROS2", "SLAM", "Sensor Fusion", "Localization"],
    links: [],
  },
  {
    slug: "autonomous-maze-navigation-robot",
    title: "Autonomous Maze Navigation Robot",
    shortDescription:
      "An autonomous robot designed to navigate complex mazes using advanced sensors and algorithms.",
    details:
      "The Autonomous Maze Navigation Robot project developed a maze-solving system using a Pololu Romi 32U4 platform. It consists of 4 Romis communicating wirelessly through an ESP32 to navigate its surroundings and exit a maze. IMU and encoders provided odometry and orientation, while AprilTags were used for communicating coordinates. Robots shared navigation status and obstacle data via MQTT.\n\nThe control strategy used sensor fusion IR distance sensors, line detectors, and camera-based tag detection. A path planner chose route segments in real-time, and a state machine handled transitions between exploration, obstacle reaction, and goal-seeking behaviors.\n\nA key deliverable was reliable multi-robot cooperation: robots updated each other's internal map and traversal decisions, enabling dynamic rerouting based on newly detected barriers. The project demonstrated robust autonomous navigation in constrained environments with real-world sensor noise and communication latency.",
    thumbnail: "RBE2002.jpg",
    image: "RBE2002.jpg",
    startDate: "Mar 2023",
    endDate: "May 2023",
    featured: false,
    topics: ["C/C++", "Pololu Romi 32U4", "ESP32", "MQTT", "AprilTags", "Sensor Fusion", "GitHub", "CameraMV"],
    links: [],
  },
  {
    slug: "4dof-robotic-arm",
    title: "4 DOF Robotic Arm",
    shortDescription:
      "A robotic arm with four degrees of freedom, designed for precise manipulation and control.",
    details:
      "The 4-DOF Robotic Arm project focused on modeling, control, and task-space manipulation of a robotic manipulator using a combination of analytical kinematics, simulation tools, and vision-based object detection. The system was developed using MATLAB and Simulink to model the robot’s kinematic structure, plan motion trajectories, and test control algorithms.\n\nThe arm’s geometry was defined using Denavit–Hartenberg parameters, enabling the derivation of forward kinematics to determine the end-effector position from joint angles and inverse kinematics to compute the joint configurations required to reach a target position within the robot’s workspace. These models were used to analyze the arm’s task space, ensuring that objects detected by the system were reachable.\n\nTrajectory planning algorithms were implemented to generate smooth and efficient joint-space motion between positions while maintaining stability and avoiding abrupt movements. The planned trajectories were simulated and visualized in MATLAB using a 3D stick model of the manipulator to verify the robot’s motion and end-effector path.\n\nA camera-based vision system was integrated to detect and classify objects by color. Image processing filters were used through MATLAB's camera functions to isolate objects using color thresholds, allowing the robot to determine object locations within the workspace. These detections were converted into task-space coordinates, which were then used by the inverse kinematics algorithms to position the end effector for object interaction.\n\nThis project combined robot kinematics, trajectory planning, computer vision, and simulation-based validation to create a robotic system capable of detecting colored objects and performing controlled manipulations within its workspace.",
    thumbnail: "4DOF.jpg",
    image: "4DOF.jpg",
    startDate: "Aug 2024",
    endDate: "Oct 2024",
    featured: false,
    topics: ["Linux", "GitHub","MATLAB", "Simulink", "C/C++", "Forward Kinematics", "Inverse Kinematics", "Computer Vision"],
    links: [],
  },
  {
    slug: "research-position-management-system",
    title: "Research Position Management System (Flask)",
    shortDescription:
      "A web platform for managing research positions and applications, including role-based access and dynamic CRUD workflows.",
    details:
      "Built a full-stack web application with a 3-person team that connects students with faculty research opportunities on campus. Students can browse open positions, submit applications, and manage their profiles, while faculty can post positions and review or manage incoming applications. The platform features two factor ID authentication, separate login flows for students and faculty, as well as dynamic forms, relational database design, and a user-friendly interface.",
    thumbnail: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=900&q=70",
    image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1600&q=80",
    startDate: "Oct 2025",
    endDate: "Dec 2025",
    featured: false,
    topics: ["Python", "Flask", "Flask-Login", "SQLAlchemy", "HTML/CSS", "Bootstrap"],
    links: [],
  },
  {
    slug: "robotic-linkage-system",
    title: "Robotic linkage system",
    shortDescription:
      "A four-bar linkage system to adjust solar panel orientation with stable position control.",
    details:
      "The Four-Bar Linkage Solar Panel System was developed to control the orientation of small-scale solar panels mounted on a model house, enabling the panels to move between two predefined angles—45° and 60° relative to the roof surface—to study the effect of panel orientation on solar exposure.\n\nThe linkage mechanism was designed in SolidWorks, where the geometry of the four-bar system was developed to achieve the desired angular motion with consistent mechanical behavior. Finite Element Analysis (FEA) was performed within SolidWorks to evaluate structural stresses and deformation in the linkage components. This analysis informed design adjustments to the thickness and shape of the links to ensure the 3D-printed parts could withstand repeated actuation without failure.\n\nThe actuation system was controlled using a Romi 32U4 microcontroller, which drove a motor through an H-bridge circuit to allow bidirectional motor control. A hysteresis-based control strategy was implemented to stabilize the panel positioning at the target angles. By defining upper and lower thresholds around each target angle, the system prevented rapid oscillations or jitter near the setpoints and ensured reliable transitions between the 45° and 60° positions.\n\nThis project integrated mechanical linkage design, structural analysis, and embedded motor control, demonstrating the use of hysteresis control and H-bridge motor drivers to achieve stable positioning of a mechanically actuated system.",
    thumbnail: "RBE2001.jpg",
    image: "RBE2001.jpg",
    startDate: "Jan 2023",
    endDate: "Mar 2023",
    featured: false,
    topics: ["SolidWorks", "FEA", "MATLAB", "Romi 32U4", "H-bridge", "Control Systems"],
    links: [
      { label: "GitHub", url: "https://github.com/" },
      { label: "App Preview", url: "https://example.com/" },
    ],
  },
];

export function getProjectBySlug(slug?: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}
