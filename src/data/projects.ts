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
  images?: string[];
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
      "Current day commercial at-home blood pressure monitors are inaccurate. To alleviate this issue, my team and I worked on developing an accurate blood pressure monitor.\n\nWe designed and built an accurate blood pressure monitor as our capstone project (MQP), handling both the hardware and firmware end-to-end. My role on this team was soldering sensors and boards and integrating an ESP32 microcontroller, MPRLS pressure sensor, PPG pulse sensor, H-bridge motor driver, and air pump into a single compact board. Additionally, I wrote firmware in C++ using PlatformIO implementing a closed-loop pneumatic control system, IIR signal filtering, oscillometric beat detection, and real-time systolic/diastolic readings on an ESP32 UART architecture.\n\nWe resulted in achieving a simple automated device that is unaffected by high noise environments. Although the device was not within 5 mmHg 95% of the time (Medical Gold Standard), we were within 5 mmHg 17% more frequently than the Omron Series 3.\n\n## Electronic Design\n| Component | Qty |\n|---|---|\n| ESP32 | 1 |\n| Push Button | 1 |\n| MPRLS Pressure Sensor | 1 |\n| Pulse Sensor | 1 |\n| DRV8833 H-Bridge Motor Driver | 1 |\n| Mitsumi Air Pump | 1 |\n| 3.3V Solenoid Valve | 2 |\n| 9V Power Supply | 1 |\n\n## Physical Design\nTo address placement variability, we designed a custom CAD housing to consolidate all electronic components and developed a precision finger clamp that ensures consistent PPG sensor positioning for reliable readings.\n\n## Algorithm\nOur algorithm uses a rolling window of recent pressure readings to compute a running mean and standard deviation. As the cuff deflates, each new sample is evaluated against this window — if the reading exceeds the mean by a set multiple of the standard deviation, it is flagged as the first sign of oscillometric blood flow, marking the onset of pulse detection for systolic and diastolic calculation.\n\n## Data Collection\n[Work in Progress]",
    thumbnail: "bp-finished.jpg",
    image: "bp-finished.jpg",
    images: ["MQP-self-test.jpg", "mqp-bp-graph.jpg"],
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
      "The SLAM Autonomous Robot Navigation System uses Simultaneous Localization and Mapping techniques to build a map of an unknown environment while tracking the robot's position in real time.\n\n## Software Tools\nROS 2, TurtleBot3, SLAM Toolbox, RViz, Python, C++, Gazebo\n\n## Control System\nA PID controller was implemented to control the robot's linear velocity and angular velocity. Both values are published directly to the /cmd_vel topic. The TurtleBot3 uses a differential drive configuration, where the difference in wheel speeds produces turning. The PID controller continuously corrects the error between the desired and actual velocity values. This produces smooth, stable movement during navigation.\n\n## Path Planning\nThe map is represented as a 2D occupancy grid stored in a 1D array. The handle_map() function converts the raw OccupancyGrid message and republishes it on /map/safe. The obstacle_expansion() function inflates each obstacle boundary by a fixed number of cells. This adds a padding zone around walls and obstacles that the robot treats as impassable. Goal positions are then validated to confirm they fall within map bounds and do not land on inflated obstacle cells.\nThe wavefront algorithm was an early prototype used to test path feasibility before the A* algorithm was fully implemented. It propagates cost values outward from the goal cell. The robot then follows the decreasing cost gradient to reach the goal.\n\n## A* Path Planning Algorithm\nTwo functions define which adjacent cells are valid moves: neighbors_of_4() returns the four cardinal neighbors, and neighbors_of_8() adds the four diagonal neighbors. The get_edge_cost() function returns the movement cost between adjacent cells. \nThe A* algorithm finds the optimal path using the formula f(x) = g(x) + h(x). g(x) is the accumulated cost from the start position to the current node. h(x) is the heuristic estimate of the remaining distance to the goal, computed as the Euclidean distance from the current cell to the goal cell. f(x) is the total estimated cost. The algorithm always expands the node with the lowest f(x) first.\nThe draw_visited() function renders each visited cell in RViz, making the exploration visible in real time. Once the optimal path is found, it is drawn as a thin black line from start to goal. The terminal prints waypoint positions as the robot passes them and shows the number of remaining waypoints. A risk map is overlaid in RViz that raises path cost near walls and obstacles. Darker colors indicate higher risk. This guides the path toward the center of open space and reduces the chance of collision.\n\n## Navigation\n### Environment Mapping & Visualization\nA 2D occupancy grid represents the environment by encoding free space, occupied cells, and unknown regions. RViz displays the live map and the robot's position. This allows the navigation system to plan paths relative to known and unknown areas of the environment.\n### Obstacle Inflation & Collision Prevention\nObstacle inflation adds a padded boundary around walls and obstacles in the map. The robot treats inflated cells as impassable. This reduces the risk of collision caused by localization error or imprecise movement during navigation.\n### Path Planning & Autonomous Navigation\nThe wavefront algorithm was used as an early prototype to test path feasibility before A* was fully implemented. It propagates cost values outward from the goal cell to build a cost map. The robot follows the decreasing cost gradient from its position to the goal.\n\n## Mapping\nfrontier_exploration.py calls the A* planner over a ROS 2 service to direct the robot toward unexplored regions. It is a ROS 2 node that drives a TurtleBot3 to autonomously explore and map an unknown environment. It works by continuously reading the live occupancy grid from SLAM Toolbox and scanning for frontier cells, which are free cells that border at least one unknown region. Those cells are grouped into clusters using a BFS flood-fill. Each cluster is assigned a navigation target by selecting the cell with the most clearance from walls and unexplored space. The robot drives to each target in sequence, repeating the loop until the entire space is mapped.",
    thumbnail: "turtlebot3.jpg",
    image: "turtlebot3.jpg",
    images: ["turtlebot3.jpg", "gazebo.jpg", "frontier-exploration.png", "large-map-exploration.png"],
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
      "The Autonomous Maze Navigation Robot project developed a maze-solving system using a Pololu Romi 32U4 platform. It consists of 4 Romis communicating wirelessly through an ESP32 to navigate its surroundings and exit a maze. IMU and encoders provided odometry and orientation, while AprilTags were used for communicating coordinates. Robots shared navigation status and obstacle data via MQTT.\n\nThe control strategy used sensor fusion IR distance sensors, line detectors, and camera-based tag detection. A path planner chose route segments in real-time, and a state machine handled transitions between exploration, obstacle reaction, and goal-seeking behaviors.\n\nA key deliverable was reliable multi-robot cooperation: robots updated each other's internal map and traversal decisions, enabling dynamic rerouting based on newly detected barriers. The project demonstrated robust autonomous navigation in constrained environments with real-world sensor noise and communication latency.\n\n## Microcontroller\nTo understand the architecture of this system, the pinout diagram was used throughout the project to optimize the board. This control board consists of dual motor drivers, quadrature encoder inputs, and power management for the Romi chassis. It also includes a built-in gyroscope and accelerometer for orientation and navigation designs.\n\n## WiFi Communication (IoT)\nUsing an ESP32, the Bluetooth system was sent through an MQTT communication server for simple messages of positions to go through and inform other robots when it crosses a specific marker. Additionally, AprilTags would send specific locations for the robots to travel to.",
    thumbnail: "RBE2002.jpg",
    image: "RBE2002.jpg",
    images: ["RBE2002.jpg", "romi-pinout.jpg"],
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
      "The 4-DOF Robotic Arm project focused on modeling, control, and task-space manipulation of a robotic manipulator using a combination of analytical kinematics, simulation tools, and vision-based object detection. The system was developed using MATLAB and Simulink to model the robot’s kinematic structure, plan motion trajectories, and test control algorithms.\n\n## Forward/Inverse Kinematics\nThese topics were utilized by creating custom C libraries to calculate the distance for the robotic arm to travel from one position to another. For forward kinematics, positions were given to each joint for the system to travel to without knowing the exact end effector position. Conversely, inverse kinematics were used to be able to send the robotic arm a position, and find the positions each joint needs to travel to for the end effector position to end there.\n\n## Trajectory Planning\nA quintuple trajectory equation was used to ensure smoothing and efficient speed for the arm to travel in. This ensured that movements stayed consistent from positions a to b.\n\n## Camera Vision\nUsing the camera system provided by the robot, we used MATLAB to correct the fisheye lens and color disorientations to ensure that the robot is able to identify the necessary components. Using functions provided by MATLAB, tools such as imfill() and mask helped smooth color detection issues.\n\nThis project combined robot kinematics, trajectory planning, computer vision, and simulation-based validation to create a robotic system capable of detecting colored objects and performing controlled manipulations within its workspace.",
    thumbnail: "4DOF.jpg",
    image: "4DOF.jpg",
    images: ["4DOF.jpg", "funny-graph.jpg"],
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
      "The Four-Bar Linkage Solar Panel System was developed to control the orientation of small-scale solar panels mounted on a model house, enabling the panels to move between two predefined angles—45° and 60° relative to the roof surface—to study the effect of panel orientation on solar exposure.\n\nThe linkage mechanism was designed in SolidWorks, where the geometry of the four-bar system was developed to achieve the desired angular motion with consistent mechanical behavior. Finite Element Analysis (FEA) was performed within SolidWorks to evaluate structural stresses and deformation in the linkage components. This analysis informed design adjustments to the thickness and shape of the links to ensure the 3D-printed parts could withstand repeated actuation without failure.\n\nThe actuation system was controlled using a Romi 32U4 microcontroller, which drove a motor through an H-bridge circuit to allow bidirectional motor control. A hysteresis-based control strategy was implemented to stabilize the panel positioning at the target angles. By defining upper and lower thresholds around each target angle, the system prevented rapid oscillations or jitter near the setpoints and ensured reliable transitions between the 45° and 60° positions.\n\nThis project integrated mechanical linkage design, structural analysis, and embedded motor control, demonstrating the use of hysteresis control and H-bridge motor drivers to achieve stable positioning of a mechanically actuated system.\n\n## Linkage Calculations\n[Work in Progress]\n\n## SolidWorks (FEA)\nAfter calculating the necessary lengths and gears needed to create the four bar system, SolidWorks was used to create the printable parts. Additionally, FEA analysis was done with PLA material to ensure that any deformation would be accounted for when printed and screwed into the robot.\n\n## H-Bridge Hysteresis\nTo ensure that the robot can reach its desired angles (45 and 60 deg), I created a mini feedback control system. To prevent the system from jittering, I included a hysteresis.\n\n## Parts\n- Servo motor\n- H-Bridge\n- Line detector\n- Ultrasonic sensor",
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
