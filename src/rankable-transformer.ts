import {
  TransformerPluginBase,
  InvalidDirectiveError,
  MappingTemplate,
  DirectiveWrapper,
  SyncUtils,
} from "@aws-amplify/graphql-transformer-core";
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
  QueryFieldType,
} from "@aws-amplify/graphql-transformer-interfaces";
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
  };
  public static PARAMETERS: {
    MemoryDBACLName: "MemoryDBACLName";
    MemoryDBAccessIAMRoleName: "MemoryDBAccessIAMRoleName:";
    MemoryDBStreamingLambdaHandlerName: "MemoryDBStreamingLambdaHandlerName";
    MemoryDBDebugStreamingLambda: "MemoryDBDebugStreamingLambda:";
    MemoryDBDebugStreamingLambdaIAMRoleName: "MemoryDBDebugStreamingLambdaIAMRoleName";
  };
}

export const directiveDefinition = /* GraphQL */ `
directive @rankable on OBJECT
`;

export class RankableTransformer extends TransformerPluginBase {
  resources: ResourceFactory = new ResourceFactory();

  constructor() {
    super("RankableTransformer", directiveDefinition);
  }
}