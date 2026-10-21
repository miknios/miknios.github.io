---
title: UE5 Locomotion & Procedural Animation Exploration
subtitle: Prototype
order: 30
video: /video/ue5anim.mp4
poster: /img/ue5anim.png
---
A deep dive into dynamic character locomotion and procedural animation systems in Unreal Engine 5. This project
focuses on custom C++ Control Rig nodes, foot placement, stride adjustments, and rotational responsiveness to achieve
smooth, grounded movement without sacrificing input control.

### Key Technical Features

- **1. Custom Stride Warping (Walk / Run)**
  - **Objective:** Minimize foot sliding caused by speed variations across directional animations.
  - **Implementation:** Designed a custom Control Rig node operating on `FControlRigElementKey` instead of relying on
    the default AnimBP Stride Warping node due to skeleton constraints.
  - **Workflow:** Baked root motion speed into animation curves using a custom `Motion Extractor Modifier`. The Control
    Rig samples this curve dynamically to scale real-time movement velocity, with an added `StrideWarpingAlpha`
    variable to selectively toggle warping per movement mode.
- **2. Procedural Aim & Turn Correction**
  - **Objective:** Enhance rotation responsiveness and convey character intent without visual popping.
  - **Implementation:** Built a custom C++ Control Rig node that applies delta rotation across a bone chain with
    configurable easing (rotating the head more aggressively than the neck and spine).
  - **Locomotion Turning:** Uses movement input acceleration to subtly turn the head toward the target direction ahead
    of the body.
  - **Aiming Mode:** Takes player Control Rotation directly for pitch/yaw targeting. Sharing the underlying system
    between locomotion and aiming ensured seamless visual transitions.
- **3. C++ Foot Locking System (Sneak / Crouched Mode)**
  - **Objective:** Eliminate noticeable foot sliding during tight rotations and low-speed, crouched stances.
  - **Implementation:** Created a C++ Control Rig node that pins feet to World Space transforms upon ground contact
    until unplanted. Kept location locked while smoothly interpolating rotation to match player input.
  - **Automation:** Developed a custom C++ Anim Modifier to automatically generate foot contact curves driven by asset
    configuration. Added a secondary modifier to dynamically override locking via a `FootLockMultiplier` curve.
- **4. Dynamic Foot & Hand Ground Placement (IK)**
  - **Objective:** Maintain realistic physical grounding across uneven terrain.
  - **Implementation:** Implemented a C++ Control Rig node performing shape sweeps per limb to offset IK effectors
    dynamically.
  - **Versatility:** Reuses the contact curve data from the Foot Lock system and extends coverage to both feet and
    hands during quadrupedal/sneak locomotion.
