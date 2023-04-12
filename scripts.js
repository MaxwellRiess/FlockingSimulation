
        const canvas = document.getElementById('flocking-canvas');
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        /*/
        let boidImage = new Image();
            boidImage.src = '/Users/maxwellriess/Desktop/Flockingsim_website/Polygon 1.svg';

            // Function to draw the custom boid shape with the correct orientation
            function drawBoidShape(ctx, x, y, angle) {
              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(angle);
              ctx.drawImage(boidImage, -boidImage.width / 50, -boidImage.height / 50, boidImage.width / 50, boidImage.height / 50);
              ctx.restore();
            }

        /*/

        class Boid {
            constructor(x, y, vx, vy) {
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
            }

            draw() {
            const emoji = ">"; // Replace this with your desired emoji
            const size = simulationParameters.boidSize;

            ctx.save();

            // Translate to the boid's position
            ctx.translate(this.x, this.y);

            // Calculate the angle based on the boid's velocity
            const angle = Math.atan2(this.vy, this.vx);

            // Rotate the canvas to the correct angle
            ctx.rotate(angle);

            ctx.font = `${size * 4}px Arial`;
            ctx.fillText(emoji, -size, size);

            ctx.restore();
            }

                update(boids) {
                let alignment = { x: 0, y: 0 };
                let cohesion = { x: 0, y: 0 };
                let separation = { x: 0, y: 0 };
                let avoidance = { x: 0, y: 0 };
                let count = 0;

                for (const other of boids) {
                    if (other !== this) {
                        const d = Math.hypot(this.x - other.x, this.y - other.y);

                        if (d < simulationParameters.perceptionRadius) {
                            alignment.x += other.vx;
                            alignment.y += other.vy;
                            cohesion.x += other.x;
                            cohesion.y += other.y;

                            if (d < simulationParameters.avoidanceRadius) {
                                const forceMultiplier = (simulationParameters.avoidanceRadius - d) / simulationParameters.avoidanceRadius;
                                avoidance.x += (this.x - other.x) * forceMultiplier;
                                avoidance.y += (this.y - other.y) * forceMultiplier;
                            }

                            count++;
                        }
                    }
                }

                if (count > 0) {
                    // Calculate average alignment, cohesion, and separation vectors
                    alignment.x /= count;
                    alignment.y /= count;
                    cohesion.x = (cohesion.x / count) - this.x;
                    cohesion.y = (cohesion.y / count) - this.y;
                    separation.x = avoidance.x;
                    separation.y = avoidance.y;

                    // Normalize and scale alignment vector
                    const alignmentMag = Math.hypot(alignment.x, alignment.y);
                    alignment.x = (alignment.x / alignmentMag) * simulationParameters.maxSpeed;
                    alignment.y = (alignment.y / alignmentMag) * simulationParameters.maxSpeed;

                    // Normalize and scale cohesion vector
                    const cohesionMag = Math.hypot(cohesion.x, cohesion.y);
                    cohesion.x = (cohesion.x / cohesionMag) * simulationParameters.maxSpeed;
                    cohesion.y = (cohesion.y / cohesionMag) * simulationParameters.maxSpeed;

                    // Normalize and scale separation vector
                    const separationMag = Math.hypot(separation.x, separation.y);
                    separation.x = (separation.x / separationMag) * simulationParameters.maxSpeed;
                    separation.y = (separation.y / separationMag) * simulationParameters.maxSpeed;

                                        // Normalize and scale avoidance vector
                    const avoidanceMag = Math.hypot(avoidance.x, avoidance.y);
                    avoidance.x = (avoidance.x / avoidanceMag) * simulationParameters.maxSpeed;
                    avoidance.y = (avoidance.y / avoidanceMag) * simulationParameters.maxSpeed;

                    // Apply weights to the vectors
                    alignment.x *= simulationParameters.alignmentWeight;
                    alignment.y *= simulationParameters.alignmentWeight;
                    cohesion.x *= simulationParameters.cohesionWeight;
                    cohesion.y *= simulationParameters.cohesionWeight;
                    separation.x *= simulationParameters.separationWeight;
                    separation.y *= simulationParameters.separationWeight;
                    avoidance.x *= simulationParameters.avoidanceWeight;
                    avoidance.y *= simulationParameters.avoidanceWeight;

                    // Calculate acceleration
                    const ax = alignment.x + cohesion.x + separation.x + avoidance.x;
                    const ay = alignment.y + cohesion.y + separation.y + avoidance.y;

                    // Apply acceleration
                    this.vx += ax * simulationParameters.maxForce;
                    this.vy += ay * simulationParameters.maxForce;

                    // Limit speed
                    const speed = Math.hypot(this.vx, this.vy);
                    if (speed > simulationParameters.maxSpeed) {
                        this.vx = (this.vx / speed) * simulationParameters.maxSpeed;
                        this.vy = (this.vy / speed) * simulationParameters.maxSpeed;
                    }
                }

                // Update position
                this.x += this.vx;
                 this.y += this.vy;

                 // Keep boids within the boundary
                    if (this.x < simulationParameters.boundary) this.vx += simulationParameters.maxForce;
                    if (this.x > canvas.width - simulationParameters.boundary) this.vx -= simulationParameters.maxForce;
                    if (this.y < simulationParameters.boundary) this.vy += simulationParameters.maxForce;
                    if (this.y > canvas.height - simulationParameters.boundary) this.vy -= simulationParameters.maxForce;

                // Wrap around the canvas
                if (simulationParameters.wrapAround) {
                    if (this.x < -simulationParameters.boidSize) this.x = canvas.width + simulationParameters.boidSize;
                    if (this.x > canvas.width + simulationParameters.boidSize) this.x = -simulationParameters.boidSize;
                    if (this.y < -simulationParameters.boidSize) this.y = canvas.height + simulationParameters.boidSize;
                    if (this.y > canvas.height + simulationParameters.boidSize) this.y = -simulationParameters.boidSize;
                }
            }
        }

        const simulationParameters = {
        numBoids: 200,
        boidSize: 5,
        maxSpeed: 1.1,
        maxForce: .004, // Lower the maxForce value to limit acceleration
        perceptionRadius: 80,
        avoidanceRadius: 100,
        alignmentWeight: 10,
        cohesionWeight: 7.5,
        separationWeight: 10,
        avoidanceWeight: 2.5,
        boundary: 1,
        wrapAround: true,
    };

        const boids = [];

        function initBoids() {
            boids.length = 0;

            for (let i = 0; i < simulationParameters.numBoids; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const vx = (Math.random() * 2 - 1) * simulationParameters.maxSpeed;
                const vy = (Math.random() * 2 - 1) * simulationParameters.maxSpeed;
                boids.push(new Boid(x, y, vx, vy));
            }
        }

        function animate() {
            ctx.fillStyle = "grey"; // Replace with your desired background color
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const boid of boids) {
                boid.update(boids);
            }

            for (const boid of boids) {
                boid.draw();
            }

            requestAnimationFrame(animate);
        }

        initBoids();

        animate();

        document.getElementById("numBoids").addEventListener("input", (event) => {
            const value = parseInt(event.target.value, 10);
            if (!isNaN(value)) {
                simulationParameters.numBoids = value;
                initBoids();
            }
        });

        document.getElementById("boidSize").addEventListener("input", (event) => {
            const value = parseInt(event.target.value, 10);
            if (!isNaN(value)) {
                simulationParameters.boidSize = value;
                initBoids();
            }
        });

        document.getElementById("maxSpeed").addEventListener("input", (event) => {
            const value = parseFloat(event.target.value);
            if (!isNaN(value)) {
                simulationParameters.maxSpeed = value;
            }
        });

        document.getElementById("maxForce").addEventListener("input", (event) => {
            const value = parseFloat(event.target.value);
            if (!isNaN(value)) {
                simulationParameters.maxForce = value;
            }
        });

        document.getElementById("avoidanceRadius").addEventListener("input", (event) => {
            const value = parseInt(event.target.value);
            if (!isNaN(value)) {
                simulationParameters.avoidanceRadius = value;
            }
        });

        document.getElementById("perceptionRadius").addEventListener("input", (event) => {
            const value = parseFloat(event.target.value);
            if (!isNaN(value)) {
                simulationParameters.perceptionRadius = value;
            }
        });

        document.getElementById("alignmentWeight").addEventListener("input", (event) => {
            const value = parseFloat(event.target.value);
            if (!isNaN(value)) {
                simulationParameters.alignmentWeight = value;
            }
        });

        document.getElementById("cohesionWeight").addEventListener("input", (event) => {
            const value = parseFloat(event.target.value);
            if (!isNaN(value)) {
                simulationParameters.cohesionWeight = value;
            }
        });

        document.getElementById("separationWeight").addEventListener("input", (event) => {
            const value = parseFloat(event.target.value);
            if (!isNaN(value)) {
                simulationParameters.separationWeight = value;
            }
        });

        document.getElementById("avoidanceWeight").addEventListener("input", (event) => {
            const value = parseFloat(event.target.value);
            if (!isNaN(value)) {
                simulationParameters.avoidanceWeight = value;
            }
        });

        const toggleMenuButton = document.getElementById('toggle-menu-button');
        const parameterMenu = document.getElementById('parameter-menu');

        toggleMenuButton.addEventListener('click', () => {
            parameterMenu.classList.toggle('show');
        });