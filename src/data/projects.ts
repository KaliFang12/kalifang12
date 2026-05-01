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
      "Current day commercial at-home blood pressure monitors are inaccurate. To alleviate this issue, my team and I worked on developing an accurate blood pressure monitor.\n\nWe designed and built an accurate blood pressure monitor as our capstone project (MQP), handling both the hardware and firmware end-to-end. My role on this team was soldering sensors and boards and integrating an ESP32 microcontroller, MPRLS pressure sensor, PPG pulse sensor, H-bridge motor driver, and air pump into a single compact board. Additionally, I wrote firmware in C++ using PlatformIO implementing a closed-loop pneumatic control system, IIR signal filtering, oscillometric beat detection, and real-time systolic/diastolic readings on an ESP32 UART architecture.\n\nWe resulted in achieving a simple automated device that is unaffected by high noise environments. Although the device was not within 5 mmHg 95% of the time (Medical Gold Standard), we were within 5 mmHg 17% more frequently than the Omron Series 3.\n\n## Electronic Design\n| Component | Qty |\n|---|---|\n| ESP32 | 1 |\n| Push Button | 1 |\n| MPRLS Pressure Sensor | 1 |\n| Pulse Sensor | 1 |\n| DRV8833 H-Bridge Motor Driver | 1 |\n| Mitsumi Air Pump | 1 |\n| 3.3V Solenoid Valve | 2 |\n| 9V Power Supply | 1 |\n\n## Physical Design\nWe created a simple CAD housing design to hold all electronic components into a system. Additionally, we created a custom finger clamp to hold the PPG sensor for precise readings.\n\n## Algorithm\nOur algorithm uses a rolling window of recent pressure readings to compute a running mean and standard deviation. As the cuff deflates, each new sample is evaluated against this window — if the reading exceeds the mean by a set multiple of the standard deviation, it is flagged as the first sign of oscillometric blood flow, marking the onset of pulse detection for systolic and diastolic calculation.\n\n## Data Collection\n[Work in Progress]",
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
      "The SLAM: Autonomous Robot Navigation System is designed to provide robust and efficient navigation capabilities for autonomous robots. It utilizes Simultaneous Localization and Mapping (SLAM) techniques to create accurate maps of the environment while keeping track of the robot's position.\n\n## Control System\n[Work in Progress]\n\n## Path Planning\nOur team viewed a simple map by visualizing it through an occupancy grid of a 2D array (stored in a 1D array). We created a handle_map() function which converts the OccupancyGrid and republishes it as a new OccupancyGrid on /map/safe.\nAfter displaying the map onto RViz, we created a C-space to display our dilation algorithm into RViz. This added padding onto the map to ensure that the robot does not interfere with the obstacles on the map. The function obstacle_expansion() was used to expand the obstacles on the map. This provides a safe guard for the robot from touching obstacles/walls.\nThen, we ensured that the goal positions are within bounds and not obstacle locations.\n\n## A* Path Planning Algorithm\nTo create the A* path planning algorithm, two functions were used, neighbors_of_4() and neighbors_of_8(). These list valid adjacent cells the robot can take during the A* path movement. The neighbors_of_4 displayed the cardinal neighbors while the neighbors_of_8 displayed the four additional diagonal coordinates. Additionally, get_edge_cost() was created to return the cost of moving from one cell to an adjacent one. The cost was determined by using the euclidean_distance, which allowed each cell cardinal movement to cost 1 and diagonal movements to be 1.414 (using distance formula).\nThen, we created an A* path planning algorithm to find the optimal path for the robot to travel to. This was implemented using the A* path planning formula: f(x)=g(x)+h(x) where g(x) is the cost from the starting position to the node it is at, h(x) is the estimated heuristic cost of the cell, and f(x) is the total cost. The path will always expand to the lowest estimated cost f(x) first.\nTo visualize the map, the function draw_visited() was created so users are able to see the robot explore the map in real time in RViz. Once the map has been explored, the optimal path is displayed through a thin black line that directs the robot from its starting position to its goal position. Additionally, the terminal displays the waypoint positions when the robot crosses the correct location and lists the amount of waypoints it needs before arriving at its goal position. Our RViz displays a risk map that increases the cost of the path if it is closer to walls/obstacles. The two images below display a gradient of colors where the darker the color, the higher the risk and closer to the danger zone the robot will go. This allows the robot to optimize its location to the center of the path to prevent it from hitting obstacles in non-ideal situations.\n\n## Navigation\n[Work in Progress]\n\n## Mapping\nfrontier_exploration.py is a ROS 2 node that drives a TurtleBot3 to autonomously explore and map an unknown environment. It works by continuously reading the live occupancy grid from SLAM Toolbox and scanning for frontier cells, which are free cells that border at least one unknown region and mark the edge of where the robot has already been. Those cells get grouped into clusters using a BFS flood-fill, and each cluster is assigned a navigation target by picking the cell with the most clearance from walls and unexplored space. A pullback step then nudges that target away from the unknown boundary to make sure the path planner always gets a goal it can actually reach. From there, the world coordinates are handed off to the A* planner over a ROS 2 service call, and the robot drives itself toward the next unexplored region, repeating the loop until the whole space is mapped.",
    thumbnail: "turtlebot3.jpg",
    image: "turtlebot3.jpg",
    images: ["turtlebot3.jpg", "gazebo.jpg", "frontier-exploration.png", "large-map-exploration.png", "real-frontier-exploration.png"],
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
