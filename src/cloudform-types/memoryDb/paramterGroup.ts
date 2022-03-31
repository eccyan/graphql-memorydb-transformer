import {ResourceBase, ResourceTag} from 'cloudform-types/types/resource'
import {Value, List} from 'cloudform-types/types/dataTypes'

export interface ParameterGroupProperties {
    Description?: Value<string>
    Family?: Value<string>
    ParameterGroupName: Value<string>
    Parameters?: {[key: string]: any}
    Tags?: List<ResourceTag> 
}

export default class ParameterGroup extends ResourceBase<ParameterGroupProperties> {
    constructor(properties: ParameterGroupProperties) {
        super('AWS::MemoryDB::ParameterGroup', properties)
    }
}