import Acl_ from './acl';
import Cluster_ from './cluster';
import ParameterGroup_ from './paramterGroup';
import SubnetGroup_ from './subnetGroup';
import User_ from './user';

export declare namespace MemoryDb {
    const Acl: typeof Acl_;
    const Cluster: typeof Cluster_;
    const ParameterGroup: typeof ParameterGroup_;
    const SubnetGroup: typeof SubnetGroup_;
    type Acl = Acl_;
    type Cluster = Cluster_;
    type ParameterGroup = ParameterGroup_;
    type SubnetGroup = SubnetGroup_;
    type User = User_;
}
