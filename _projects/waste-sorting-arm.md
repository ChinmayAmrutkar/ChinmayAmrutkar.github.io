---
# _projects/waste-sorting-arm.md
layout: post
title: "Design and Prototyping of Robotic Arm for Waste Sorting using Computer Vision"
date: 2022-11-30 # Date project completed
categories: robotics computer-vision deep-learning arduino prototyping sustainability yolov7
# Optional: Add a relevant header image if you have one
# image: /assets/images/waste_sorting_arm.jpg
---

## Design and Prototyping of Robotic Arm for Waste Sorting using Computer Vision

**(Optional: Add a key image or GIF/video showing the arm sorting waste here)**
### Goal
To design, build, and program a robotic arm capable of automatically identifying and sorting common recyclable waste items (glass, paper, cardboard, tin cans) using computer vision, addressing real-world sustainability challenges.

### My Role & Contributions (as Designer/Developer)
* Designed and built a 4 Degree-of-Freedom (DOF) robotic arm prototype capable of manipulation tasks with a payload capacity of 200 grams.
* Implemented control logic for the arm using an Arduino microcontroller.
* Developed the computer vision pipeline for waste detection, including data collection and model training.
* Trained a YOLOv7 deep learning model on a custom dataset of over 2000 images to accurately detect the different types of recyclable materials.
* Integrated the perception system with the robotic arm control to achieve autonomous sorting.

### Technologies Used
* **Hardware:** Custom 4 DOF Robotic Arm, Arduino
* **Software:** Python, Arduino IDE (C/C++)
* **AI/CV:** Deep Learning (YOLOv7), Object Detection, OpenCV (likely used for image handling/processing)
* **Concepts:** Robotic Manipulation, Prototyping, Embedded Systems Control, Sustainable Technology

### Approach & Implementation
* Constructed the robotic arm using appropriate mechanical components and actuators.
* Programmed the Arduino to control the arm's joint movements based on commands.
* Created a dataset of recyclable items and trained the YOLOv7 object detection model.
* Developed a Python script to capture images (likely via webcam), run inference using the trained YOLOv7 model, identify waste items and their locations, and send appropriate commands to the Arduino to control the arm for picking and placing items into designated sorting bins.

### Results & Outcome
* Successfully built a functional 4 DOF robotic arm prototype with a 200-gram payload capacity.
* Achieved high accuracy in perception tasks using the YOLOv7 model trained on 2000+ images, enabling reliable detection of glass, paper, cardboard, and tin cans.
* Demonstrated the capability of the integrated system to autonomously sort these recyclables, contributing a practical solution towards waste management automation.

**[Link to Code Repository (if public)]**
**[Link to Publication (if related - e.g., the IJIDeM paper)]**