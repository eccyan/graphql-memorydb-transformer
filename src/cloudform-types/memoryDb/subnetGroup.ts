import {ResourceBase, ResourceTag} from 'cloudform-types/types/resource'
import {Value, List} from 'cloudform-types/types/dataTypes'

export interface SubnetGroupProperties {
    Description?: Value<string>
    SubnetGroupName: Value<string>
    SubnetIds?: List<string>
    Tags?: List<ResourceTag> 
}

export default class SubnetGroup extends ResourceBase<SubnetGroupProperties> {
    constructor(properties: SubnetGroupProperties) {
        super('AWS::MemoryDB::SubnetGroup', properties)
    }
}