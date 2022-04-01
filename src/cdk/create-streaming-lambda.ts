import {
  GraphQLAPIProvider,
  TransformerContextProvider,
} from "@aws-amplify/graphql-transformer-interfaces";
import {
  IFunction,
  LayerVersion,
  Runtime,
} from "@aws-cdk/aws-lambda";
import {
  CfnParameter,
  Construct,
  Fn,
  Stack,
} from "@aws-cdk/core";
import {
  Effect,
  IRole,
  Policy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "@aws-cdk/aws-iam";
import { ResourceConstants } from "../rankable-transformer";
import * as path from "path";
import assert from "assert";

export const createLambda = (
  stack: Stack,
  apiGraphql: GraphQLAPIProvider,
  parameterMap: Map<string, CfnParameter>,
  lambdaRole: IRole,
  endpoint: string,
  isProjectUsingDataStore: boolean,
  region?: string
): IFunction => {
  assert(region);
  const { MemoryDBStreamingLambdaFunctionLogicalID } =
    ResourceConstants.RESOURCES;
  const { MemoryDBStreamingLambdaHandlerName, MemoryDBDebugStreamingLambda } =
    ResourceConstants.PARAMETERS;
  const enviroment: { [key: string]: string } = {
    OPENSEARCH_ENDPOINT: "https://" + endpoint,
    OPENSEARCH_REGION: region,
    DEBUG: parameterMap.get(MemoryDBDebugStreamingLambda)!.valueAsString,
    OPENSEARCH_USE_EXTERNAL_VERSIONING: isProjectUsingDataStore.toString(),
  };

  return apiGraphql.host.addLambdaFunction(
    MemoryDBStreamingLambdaFunctionLogicalID,
    "functions/" + MemoryDBStreamingLambdaFunctionLogicalID + ".zip",
    parameterMap.get(MemoryDBStreamingLambdaHandlerName)!.valueAsString,
    path.resolve(__dirname, "..", "..", "lib", "streaming-lambda.zip"),
    Runtime.PYTHON_3_6,
    [
      LayerVersion.fromLayerVersionArn(
        stack,
        "LambdaLayerVersion",
        Fn.findInMap(
          "LayerResourceMapping",
          Fn.ref("AWS::Region"),
          "layerRegion"
        )
      ),
    ],
    lambdaRole,
    enviroment,
    undefined,
    stack
  );
};

export const createLambdaRole = (
  context: TransformerContextProvider,
  stack: Construct,
  parameterMap: Map<string, CfnParameter>
): IRole => {
  const { MemoryDBStreamingLambdaFunctionIAMRoleLogicalID } =
    ResourceConstants.RESOURCES;
  const { MemoryDBDebugStreamingLambdaIAMRoleName } =
    ResourceConstants.PARAMETERS;
  const role = new Role(
    stack,
    MemoryDBStreamingLambdaFunctionIAMRoleLogicalID,
    {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      roleName: context.resourceHelper.generateIAMRoleName(
        parameterMap.get(MemoryDBDebugStreamingLambdaIAMRoleName)
          ?.valueAsString ?? ""
      ),
    }
  );
  role.attachInlinePolicy(
    new Policy(stack, "CloudwatchLogsAccess", {
      statements: [
        new PolicyStatement({
          actions: [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents",
          ],
          effect: Effect.ALLOW,
          resources: ["arn:aws:logs:*:*:*"],
        }),
      ],
    })
  );

  return role;
};
