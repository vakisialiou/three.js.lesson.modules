import {
  PointLight,
  Vector3,
  DirectionalLight,
  DirectionalLightHelper,
  PointLightHelper,
  AmbientLight,
  HemisphereLight,
  Object3D
} from 'three'
import { LensFlare, LensFlareElement } from '@app/three-dependense/LensFlare'
import * as CONST from '@app/constants'

class LightControls {
  /**
   *
   * @param {Scene} scene
   * @param {Loader} loader
   */
  constructor(scene, loader) {
    /**
     *
     * @type {Scene}
     */
    this.scene = scene

    /**
     *
     * @type {Loader}
     */
    this.loader = loader

    /**
     *
     * @type {Vector3}
     */
    this.position = new Vector3(0, 0, 0)

    /**
     *
     * @type {PointLight}
     */
    this.pointLight = new PointLight(0XFFFFFF, 2.5, 4000)
    this.pointLight.position.copy(this.position)
    this.pointLight.castShadow = false

    /**
     *
     * @type {HemisphereLight}
     */
    this.hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 0.2)

    /**
     *
     * @type {AmbientLight}
     */
    this.ambientLight = new AmbientLight(0x111111)
  }
}

export default LightControls