/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export interface IFleetCompParams {
    // Any parameters go here, TBD
    resources: number;
    teamNumber: number;

    // Defines the area to contain the fleet
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  }
}
