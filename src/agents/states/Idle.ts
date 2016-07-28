/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  // In this state, agents attempt to path to an enemy while avoiding combat
  export class Idle extends State {
    public update(agent: Ship): State {
      // select a new target
      if (Battle.CurrentBattle) {
        agent.target = agent.selectTargetFrom(Battle.CurrentBattle.allShips);
        if (!agent.target || agent.target.health <= 0) {
          agent.target = null;
        }
        // don't do anything else if there are no targets
        if (!agent.target || !agent.target.sprite || !agent.target.body) {
          return this;
        }
         // otherwise strafe towards target
        return new Strafe();
      }
      // continue to idle
      return this;
    }
  }
}
