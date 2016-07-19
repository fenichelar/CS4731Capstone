/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class HelperMethods {
    // http://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    public static randomIntInInterval(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }
}
