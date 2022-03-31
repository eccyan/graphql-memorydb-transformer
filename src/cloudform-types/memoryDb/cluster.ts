import {ResourceBase, ResourceTag} from 'cloudform-types/types/resource'
import {Value, List} from 'cloudform-types/types/dataTypes'

export class Endpoint {
    Address?: Value<string>
    Port?: Value<number>

    constructor(properties: Endpoint) {
        Object.assign(this, properties)
    }
}

export interface ClusterProperties {
    ACLName?: Value<string>
    AutoMinorVersionUpgrade?: Value<boolean>
    ClusterEndpoint?: Endpoint
    ClusterName: Value<string>
    Description?: Value<string>
    EngineVersion?: Value<string>
    FinalSnapshotName?: Value<string>
    KmsKeyId?: Value<string>
    MaintenanceWindow?: Value<string>
    NodeType?: Value<string>
    NumReplicasPerShard?: Value<number>
    NumShards?: Value<number>
    ParameterGroupName?: Value<string>
    Port?: Value<number>
    SecurityGroupIds?: List<string>
    SnapshotArns?: List<string>
    SnapshotName?: Value<string>
    SnapshotRetentionLimit?: Value<number>
    SnapshotWindow?: Value<string>
    SnsTopicArn?: Value<string>
    SnsTopicStatus?: Value<string>
    SubnetGroupName?: Value<string>
    Tags?: List<ResourceTag>
    TLSEnabled?: Value<Boolean>
}

export default class Cluster extends ResourceBase<ClusterProperties> {
    static Endpoint = Endpoint;

    constructor(properties: ClusterProperties) {
        super('AWS::MemoryDB::Cluster', properties)
    }
}