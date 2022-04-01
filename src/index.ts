import { RankableTransformer } from "./rankable-transformer";
import { ResourceFactory } from "./resources";

console.log((new ResourceFactory).initTemplate().Parameters);
console.log((new ResourceFactory).initTemplate().Resources);
console.log((new ResourceFactory).initTemplate().Outputs);

export default RankableTransformer;