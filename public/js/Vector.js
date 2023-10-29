class Vector {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  // setDirection(direction) {
  //   var magnitude = this.getMagnitude();
  //   this.x = Math.cos(angle) * magnitude;
  //   this.y = Math.sin(angle) * magnitude;
  // }
  // get the magnitude of the vector
  getMagnitude() {
    // use pythagoras theorem to work out the magnitude of the vector
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  // set the magnitude of the vector
  setMagnitude(magnitude) {
    var direction = this.getDirection();
    this.x = Math.cos(direction) * magnitude;
    this.y = Math.sin(direction) * magnitude;
  }
  // multiply this vector by the scalar
  multiplyBy(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }

  divideBy(scalar) {
    this.x /= scalar;
    this.y /= scalar;
  }
  // Utilities
  copy() {
    return new Vector(this.x, this.y);
  }

  limit(max) {
    const magnitude = this.getMagnitude();
    if (magnitude > max) {
      this.divideBy(magnitude);
      this.multiplyBy(max);
    }
    return this;
  }
}
export default Vector;
