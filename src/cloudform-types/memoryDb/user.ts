
import {ResourceBase, ResourceTag} from 'cloudform-types/types/resource'
import {Value, List} from 'cloudform-types/types/dataTypes'

export interface UserProperties {
    AccessString: Value<string>
    AuthenticationMode: {[key: string]: any}
    Tags?: List<ResourceTag> 
    UserName: Value<string>
}

export default class User extends ResourceBase<UserProperties> {
    constructor(properties: UserProperties) {
        super('AWS::MemoryDB::User', properties)
    }
}