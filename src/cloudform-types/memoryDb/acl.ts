import {ResourceBase, ResourceTag} from 'cloudform-types/types/resource'
import {Value, List} from 'cloudform-types/types/dataTypes'

export interface AclProperties {
    AclName : Value<string>
    Tags?: List<ResourceTag>
    UserNames?: List<string>
}

export default class Acl extends ResourceBase<AclProperties> {
    constructor(properties: AclProperties) {
        super('AWS::MemoryDB::ACL', properties)
    }
}