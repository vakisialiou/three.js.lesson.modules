import { PerspectiveCamera, Raycaster, Vector2, Vector3 } from 'three'
import Model from '@app/playground/controls/models/Model'

class Intersect {
  /**
   *
   * @param {PerspectiveCamera} camera
   * @param {Gyroscope} gyroscope
   */
  constructor(camera, gyroscope) {
    /**
     *
     * @type {PerspectiveCamera}
     */
    this.camera = camera

    /**
     *
     * @type {Gyroscope}
     */
    this.gyroscope = gyroscope

    /**
     *
     * @type {Vector2}
     */
    this.mouse = new Vector2()

    /**
     *
     * @type {Vector3}
     */
    this.dirrection = new Vector3(0, 0, 1)

    /**
     *
     * @type {Vector3}
     */
    this.rayStartFrom = new Vector3()

    /**
     *
     * @type {Raycaster}
     */
    this.raycaster = new Raycaster()
  }

  /**
   *
   * @param {MouseEvent} mouseEvent
   * @returns {Intersect}
   */
  updateMouse(mouseEvent) {
    this.mouse.x = (mouseEvent.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = - (mouseEvent.clientY / window.innerHeight) * 2 + 1
    return this
  }

  /**
   *
   * @param {Array.<Mesh|Object3D>|Mesh|Object3D} elements
   * @param {boolean} recursive
   * @returns {boolean}
   */
  is(elements, recursive = false) {
    return this.findIntersection(elements, recursive).length > 0
  }

  /**
   *
   * @param {Array.<Mesh|Object3D>|Mesh|Object3D} elements
   * @param {boolean} [recursive]
   * @param {number} [distance]
   * @returns {Array}
   */
  findIntersection(elements, recursive = false, distance = Infinity) {
    this.dirrection.setX(this.mouse.x)
    this.dirrection.setY(this.mouse.y)
    this.dirrection.unproject(this.camera)

    this.rayStartFrom.copy(this.camera.position)
    this.rayStartFrom.add(this.gyroscope.parent.position)
    this.raycaster.ray.origin = this.rayStartFrom
    this.raycaster.far = distance

    this.raycaster.ray.direction = this.dirrection.sub(this.rayStartFrom).normalize()

    let intersects = []
    if (Array.isArray(elements)) {
      intersects = this.raycaster.intersectObjects(elements, recursive)
    } else {
      intersects = this.raycaster.intersectObject(elements, recursive)
    }
    return intersects
  }

  /**
   *
   * @param {Array.<Model>} elements
   * @param {boolean} [recursive]
   * @param {number} [distance]
   * @returns {Array}
   */
  findIntersectionModels(elements, recursive = false, distance = Infinity) {
    const findModel = (obj) => {
      const parent = obj['parent']
      if (!obj || !parent) {
        return null
      }

      if (parent instanceof Model) {
        return parent
      }

      return findModel(parent)
    }

    const keys = []
    const models = []
    const intersection = this.findIntersection(elements, recursive, distance)
    for (const data of intersection) {
      const model = findModel(data.object)
      if (!keys.includes(model.uuid)) {
        keys.push(model.uuid)
        models.push(model)
      }
    }

    return models
  }
}

export default Intersect