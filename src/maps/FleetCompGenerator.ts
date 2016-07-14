/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

namespace Game {
  export class FleetCompGenerator {
    private params: IFleetCompParams;

    public constructor(params?: IFleetCompParams) {
      this.params = params || {};
    }

    /**
     * Generates a fleet composition from the current params and returns it
     * as a list of ships (which should have positions), for now
     */
    public generateFleet(): Array<any> {
      return [];
    }

    public setParams(newParams: IFleetCompParams): void {
      this.params = newParams;
    }
  }
}
