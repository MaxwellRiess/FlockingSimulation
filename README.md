# FlockingSimulation

A flocking simulation implimented with the HTMLS canvas API and vanilla javascript. 

The simulation is dymanically controllable by the parameter menu

- **Number of Boids**: The total number of boids (individual agents) present in the simulation.

- **Max Speed**: The maximum speed a boid can travel in the simulation.

- **Max Force**: The maximum force applied to a boid when accelerating. Higher values result in quicker changes in direction or speed.

- **Avoidance Radius**: The distance within which a boid tries to actively avoid other boids to prevent collisions or overlapping.

- **Boid Size**: The size (radius) of each boid displayed in the simulation.

- **Perception Radius**: The distance within which a boid can perceive and react to other nearby boids. Boids outside this radius have no influence on a boid's behavior.

- **Alignment Weight**: The weight given to the alignment rule in the simulation. Higher values cause boids to prioritize aligning their direction with the average direction of nearby boids.

- **Cohesion Weight**: The weight given to the cohesion rule in the simulation. Higher values cause boids to prioritize staying close to the average position of nearby boids.

- **Separation Weight**: The weight given to the separation rule in the simulation. Higher values cause boids to prioritize maintaining a minimum distance from nearby boids, preventing overcrowding.
- **Avoidance Weight**: The weight given to the avoidance rule in the simulation. Higher values cause boids to prioritize avoiding other boids within the avoidance radius more aggressively.
