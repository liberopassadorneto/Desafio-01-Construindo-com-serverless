import { APIGatewayProxyHandler } from "aws-lambda";

const handler: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created successfully",
    }),
  };
};

export { handler };
