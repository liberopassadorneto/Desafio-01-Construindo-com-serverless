import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

const handler: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters;

  const response = await document
    .scan({
      TableName: "todos",
      FilterExpression: ":user_id = user_id",
      ExpressionAttributeValues: {
        ":user_id": userId,
      },
    })
    .promise();

  if (!response.Items) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No todos found for this user",
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items),
  };
};

export { handler };
