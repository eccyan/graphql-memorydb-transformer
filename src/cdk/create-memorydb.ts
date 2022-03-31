import { CfnACL, CfnCluster } from "@aws-cdk/aws-memorydb";
import { IRole, Role, ServicePrincipal } from "@aws-cdk/aws-iam";
import { CfnParameter, Construct, Fn } from "@aws-cdk/core";
import { Construct as Construct_1_127 } from "aws-cdk-core-1.127";
import { ResourceConstants as CommonResourceConstants } from "graphql-transformer-common";
import { ResourceConstants } from "../memorydb-transformer";

export const createMemoryDb = (
  stack: Construct,
  parameterMap: Map<string, CfnParameter>,
  apiId: string
): CfnCluster => {
  const { MemoryDBLogicalID } = ResourceConstants.RESOURCES;
  const { HasEnvironmentParameter } = CommonResourceConstants.CONDITIONS;

  return new CfnCluster(
    new Construct_1_127(stack, stack.node.id),
    MemoryDBLogicalID,
    {
      aclName: MemoryDBLogicalID,
      clusterName: Fn.conditionIf(
        HasEnvironmentParameter,
        Fn.ref(CommonResourceConstants.PARAMETERS.Env),
        "mdb" + apiId
      ).toString(),
      nodeType: "db.r6g.large", // TODO: nodeType should be selectable
    }
  );
};

export const createMemoryDbAcl = (
  stack: Construct,
  parameterMap: Map<string, CfnParameter>,
  apiId: string,
  envParam: CfnParameter
): CfnACL => {
  const { MemoryDBACLLogicalID } = ResourceConstants.RESOURCES;
  const { MemoryDBACLName } = ResourceConstants.PARAMETERS;
  const { HasEnvironmentParameter } = CommonResourceConstants.CONDITIONS;
  return new CfnACL(
    new Construct_1_127(stack, stack.node.id),
    MemoryDBACLLogicalID,
    {
      aclName: Fn.conditionIf(
        HasEnvironmentParameter,
        Fn.join("-", [
          parameterMap.get(MemoryDBACLName)!.valueAsString,
          apiId,
          envParam.valueAsString,
        ]),
        MemoryDBACLName
      ).toString(),
    }
  );
};

export const createMemoryDbRole = (
  stack: Construct,
  parameterMap: Map<string, CfnParameter>,
  apiId: string,
  envParam: CfnParameter
): IRole => {
  const { MemoryDBAccessIAMRoleLogicalID } = ResourceConstants.RESOURCES;
  const { MemoryDBAccessIAMRoleName } = ResourceConstants.PARAMETERS;
  const { HasEnvironmentParameter } = CommonResourceConstants.CONDITIONS;
  return new Role(stack, MemoryDBAccessIAMRoleLogicalID, {
    assumedBy: new ServicePrincipal("appsync.amazonaws.com"),
    roleName: Fn.conditionIf(
      HasEnvironmentParameter,
      Fn.join("-", [
        parameterMap.get(MemoryDBAccessIAMRoleName)!.valueAsString,
        apiId,
        envParam.valueAsString,
      ]),
      Fn.join("-", [
        parameterMap.get(MemoryDBAccessIAMRoleName)!.valueAsString,
        apiId,
      ])
    ).toString(),
  });
};
