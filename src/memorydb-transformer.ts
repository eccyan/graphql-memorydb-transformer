import { TransformerModelBase, InvalidDirectiveError, MappingTemplate, DirectiveWrapper } from '@aws-amplify/graphql-transformer-core';
import {
    DataSourceProvider,
    TransformerContextProvider,
    TransformerPrepareStepContextProvider,
    TransformerBeforeStepContextProvider,
    TransformerSchemaVisitStepContextProvider,
    TransformerTransformSchemaStepContextProvider,
    AppSyncDataSourceType,
    TransformerResolverProvider,
    MutationFieldType,
    SubscriptionFieldType,
    DataSourceInstance,
    QueryFieldType 
} from '@aws-amplify/graphql-transformer-interfaces';
import {
    DirectiveNode,
    ObjectTypeDefinitionNode,
    InterfaceTypeDefinitionNode,
    FieldDefinitionNode,
    DocumentNode,
    DirectiveDefinitionNode,
    InputValueDefinitionNode,
} from "graphql";
import { ResourceFactory } from "./resources";

export class ResourceConstants {
    public static RESOURCES: {
        MemoryDBLogicalID: "MemoryDBLogicalID";
        MemoryDBACLLogicalID: "MemoryDBACLLogicalID";
        MemoryDBAccessIAMRoleLogicalID: "MemoryDBAccessIAMRoleLogicalID";
        MemoryDBStreamingLambdaFunctionLogicalID: "MemoryDBStreamingLambdaFunctionLogicalID";
        MemoryDBStreamingLambdaFunctionIAMRoleLogicalID: "MemoryDBStreamingLambdaFunctionIAMRoleLogicalID";
    }
    public static PARAMETERS: {
        MemoryDBACLName: "MemoryDBACLName";
        MemoryDBAccessIAMRoleName: "MemoryDBAccessIAMRoleName:";
        MemoryDBStreamingLambdaHandlerName: "MemoryDBStreamingLambdaHandlerName";
        MemoryDBDebugStreamingLambda: "MemoryDBDebugStreamingLambda:";
        MemoryDBDebugStreamingLambdaIAMRoleName: "MemoryDBDebugStreamingLambdaIAMRoleName";
    }
}

export const directiveDefinition = `
    directive @memorydb on OBJECT
`;

export class MemorydbTransformer extends TransformerModelBase {
    resources: ResourceFactory = new ResourceFactory;

    constructor() {
        super("MemorydbTransformer", directiveDefinition);
    }

    getDataSourceType = (): AppSyncDataSourceType => { return AppSyncDataSourceType.AWS_LAMBDA };

    generateGetResolver = (ctx: TransformerContextProvider, type: ObjectTypeDefinitionNode, typeName: string, fieldName: string, resolverLogicalId: string, directive?: DirectiveDefinitionNode): TransformerResolverProvider => {
    };

    generateListResolver = (ctx: TransformerContextProvider, type: ObjectTypeDefinitionNode, typeName: string, fieldName: string, resolverLogicalId: string, directive?: DirectiveDefinitionNode): TransformerResolverProvider => { };

    generateCreateResolver = (ctx: TransformerContextProvider, type: ObjectTypeDefinitionNode, typeName: string, fieldName: string, resolverLogicalId: string, directive?: DirectiveDefinitionNode): TransformerResolverProvider => { };
    generateUpdateResolver = (ctx: TransformerContextProvider, type: ObjectTypeDefinitionNode, typeName: string, fieldName: string, resolverLogicalId: string, directive?: DirectiveDefinitionNode): TransformerResolverProvider => { };
    generateDeleteResolver = (ctx: TransformerContextProvider, type: ObjectTypeDefinitionNode, typeName: string, fieldName: string, resolverLogicalId: string, directive?: DirectiveDefinitionNode): TransformerResolverProvider => { };

    getQueryFieldNames = (ctx: TransformerContextProvider, type: ObjectTypeDefinitionNode, directive?: DirectiveDefinitionNode): Set<{
        fieldName: string;
        typeName: string;
        type: QueryFieldType;
    }> => { }
    getMutationFieldNames = (ctx: TransformerContextProvider, type: ObjectTypeDefinitionNode, directive?: DirectiveDefinitionNode): Set<{
        fieldName: string;
        typeName: string;
        type: MutationFieldType;
    }> => { }
    getSubscriptionFieldNames = (ctx: TransformerContextProvider, type: ObjectTypeDefinitionNode, directive?: DirectiveDefinitionNode): Set<{
        fieldName: string;
        typeName: string;
        type: SubscriptionFieldType;
    }> => { }
    getDataSourceResource = (ctx: TransformerContextProvider, type: ObjectTypeDefinitionNode): DataSourceInstance => { }
    getInputs = (ctx: TransformerContextProvider, type: ObjectTypeDefinitionNode, operation: {
        fieldName: string;
        typeName: string;
        type: QueryFieldType | MutationFieldType | SubscriptionFieldType;
    }): InputValueDefinitionNode[] => { }
    getOutputType = (ctx: TransformerContextProvider, type: ObjectTypeDefinitionNode, operation: {
        fieldName: string;
        typeName: string;
        type: QueryFieldType | MutationFieldType | SubscriptionFieldType;
    }): ObjectTypeDefinitionNode => { }

    generateOnCreateResolver = (ctx: TransformerContextProvider, type: ObjectTypeDefinitionNode, typeName: string, fieldName: string, resolverLogicalId: string, directive?: DirectiveDefinitionNode): TransformerResolverProvider => { };
    generateOnUpdateResolver = (ctx: TransformerContextProvider, type: ObjectTypeDefinitionNode, typeName: string, fieldName: string, resolverLogicalId: string, directive?: DirectiveDefinitionNode): TransformerResolverProvider => { };
    generateOnDeleteResolver = (ctx: TransformerContextProvider, type: ObjectTypeDefinitionNode, typeName: string, fieldName: string, resolverLogicalId: string, directive?: DirectiveDefinitionNode): TransformerResolverProvider => { };
    generateSyncResolver = (ctx: TransformerContextProvider, type: ObjectTypeDefinitionNode, typeName: string, fieldName: string, resolverLogicalId: string, directive?: DirectiveDefinitionNode): TransformerResolverProvider => { };

    before = (ctx: TransformerBeforeStepContextProvider): void => {
        // const template = this.resources.initTemplate();
        // for (const key in template.Parameters) {
        //     CfnParameterProps
        //     ctx.stackManager.addParameter(key, template.Parameters[key]);
        // }
        
            
        // ctx.mergeParameters(template.Parameters || {});
        // ctx.mergeResources(template.Resources || {});
        // ctx.mergeOutputs(template.Outputs || {});
        // ctx.mergeConditions(template.Conditions);
    }

    object = (definition: ObjectTypeDefinitionNode, directive: DirectiveNode, ctx: TransformerSchemaVisitStepContextProvider): void => { }
}