import { Vector3, Object3D, Geometry, PointsMaterial, Points, Math } from 'three'

class StarControls {
  /**
   *
   * @param {Object3D} object
   */
  constructor(object) {
    /**
     * @type {Object3D}
     */
    this.object = object

    /**
     *
     * @type {Geometry}
     */
    this.geometry = new Geometry()

    /**
     *
     * @type {PointsMaterial}
     */
    this.material = new PointsMaterial({color: 0x888888, size: 3})

    /**
     *
     * @type {Points}
     */
    this.points = new Points()
  }

  /**
   *
   * @param {Loader} loader
   * @returns {void}
   */
  async beforeStart(loader) {
    this.points.geometry = this.geometry
    this.points.material = this.material
    this.object.add(this.points)
  }

  /**
   *
   * @param {Array.<Star>} data
   */
  copy(data) {
    for (const item of data) {
      this.geometry.vertices.push(item.position)
    }
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {

  }
}

export default StarControls