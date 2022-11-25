import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";
import { v4 as uuid } from "uuid";

interface ICreateTodo {
  title: string;
  deadline: string;
}

interface ITodo {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: string;
}

const handler: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

  const todo = {
    id: uuid(),
    user_id: userId,
    title,
    done: false,
    deadline: new Date(deadline).toUTCString(),
  } as ITodo;

  await document.put({ TableName: "todos", Item: todo }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      todo,
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
};

export { handler };
