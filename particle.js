class Particle {
	/**
	 * Constructs a particle instance representing an object floating above
	 * the planet surface.
	 * Pass a dict containing x, y, z, radius, and color
	 */
	constructor({x, y, z, radius, color}) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.radius = radius;
		this.color = color;
	}

	/**
	 * Render many particles.
	 * @param planet the planet associated with the particles
	 * @param camera the camera parameters to render with
	 * @param particles an iterable of Particle instances
	 * @param destCtx the CanvasRenderingContext2D on which to render
	 */
	static renderAll(planet, camera, particles, destCtx) {
		let {rotX, rotY, rotZ, w, h} = camera;
		const planetSize = planet.traits.size;

		//screen center
		const cx = w * 0.5, cy = h * 0.5;

		for (let p of particles) {
			let x1 = p.x, y1 = p.y, z1 = p.z;

			//apply rotation
			if (rotY !== 0) {
				const zt = z1, xt = x1;
				x1 = zt * Math.sin(rotY) + xt * Math.cos(rotY);
				z1 = zt * Math.cos(rotY) - xt * Math.sin(rotY);
			}
			if (rotX !== 0) {
				const yt = y1, zt = z1;
				y1 = yt * Math.cos(rotX) - zt * Math.sin(rotX);
				z1 = yt * Math.sin(rotX) + zt * Math.cos(rotX);
			}
			if (rotZ !== 0) {
				const xt = x1, yt = y1;
				x1 = xt * Math.cos(rotZ) - yt * Math.sin(rotZ);
				y1 = xt * Math.sin(rotZ) + yt * Math.cos(rotZ);
			}

			//compute z coord of planet at the position of this particle
			const planetZ = Math.sqrt(planetSize**2 - x1*x1 - y1*y1);
			if (z1 > planetZ)
				continue;

			//render particle
			const size = p.radius;
			destCtx.fillStyle = p.color;
			destCtx.fillRect(
				Math.floor(x1 * cx + cx - size/2),
				Math.floor(y1 * cy + cy - size/2),
				Math.floor(size), Math.floor(size));
		}
	}
}