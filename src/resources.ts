import { AppSync, Fn, StringParameter, Refs, } from "cloudform-types";
import { MemoryDb } from "./cloudform-types/memoryDb";
import { ResourceConstants as CommonResourceConstants } from "graphql-transformer-common";
import { ResourceConstants } from "./rankable-transformer";
import Output from "cloudform-types/types/output";
import Template from "cloudform-types/types/template";

export class ResourceFactory {
  public makeParams() {
    return {
      [ResourceConstants.PARAMETERS.MemoryDBAccessIAMRoleName]:
        new StringParameter({
          Description:
            "The name of the IAM role assumed by AppSync for MemoryDB.",
          Default: "AppSyncMemoryDBRole",
        }),
    };
  }
  public initTemplate(): Template {
    return {
      Parameters: this.makeParams(),
      Resources: {
        [CommonResourceConstants.RESOURCES.GraphQLAPILogicalID]:
          this.makeAppSyncAPI(),
      },
      Outputs: {
        [CommonResourceConstants.OUTPUTS.GraphQLAPIIdOutput]:
          this.makeAPIIDOutput(),
        [CommonResourceConstants.OUTPUTS.GraphQLAPIEndpointOutput]:
          this.makeAPIEndpointOutput(),
      },
      Conditions: {},
    };
  }

  /**
   * Create the AppSync API.
   */
  public makeAppSyncAPI() {
    return new AppSync.GraphQLApi({
      Name: Fn.If(
        CommonResourceConstants.CONDITIONS.HasEnvironmentParameter,
        Fn.Join("-", [
          Fn.Ref(CommonResourceConstants.PARAMETERS.AppSyncApiName),
          Fn.Ref(CommonResourceConstants.PARAMETERS.Env),
        ]),
        Fn.Ref(CommonResourceConstants.PARAMETERS.AppSyncApiName)
      ),
      AuthenticationType: "API_KEY",
    });
  }

  public makeAppSyncSchema(schema: string) {
    return new AppSync.GraphQLSchema({
      ApiId: Fn.GetAtt(
        CommonResourceConstants.RESOURCES.GraphQLAPILogicalID,
        "ApiId"
      ),
      Definition: schema,
    });
  }

  /**
   * Outputs
   */
  public makeAPIIDOutput(): Output {
    return {
      Description: "Your GraphQL API ID.",
      Value: Fn.GetAtt(
        CommonResourceConstants.RESOURCES.GraphQLAPILogicalID,
        "ApiId"
      ),
      Export: {
        Name: Fn.Join(":", [Refs.StackName, "GraphQLApiId"]),
      },
    };
  }

  public makeAPIEndpointOutput(): Output {
    return {
      Description: "Your GraphQL API endpoint.",
      Value: Fn.GetAtt(
        CommonResourceConstants.RESOURCES.GraphQLAPILogicalID,
        "GraphQLUrl"
      ),
      Export: {
        Name: Fn.Join(":", [Refs.StackName, "GraphQLApiEndpoint"]),
      },
    };
  }

  public makeMemoryDB() {
    return new MemoryDb.Cluster({
      ClusterName: Fn.If(
        CommonResourceConstants.CONDITIONS.HasEnvironmentParameter,
        Fn.Join("-", [
          Fn.Ref(CommonResourceConstants.PARAMETERS.AppSyncApiId),
          Fn.Ref(CommonResourceConstants.PARAMETERS.Env),
        ]),
        "md" + Fn.Ref(CommonResourceConstants.PARAMETERS.AppSyncApiId)
      ),
    });
  }
}
