import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { ALL_WILDERS } from "./gql/queries/getAllWilders";
import App from "./App";
import { GraphQLError } from "graphql";

test("loading", () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test("Wilder Name", async () => {
  render(
    <MockedProvider
      mocks={[
        {
          request: {
            query: ALL_WILDERS,
          },
          result: {
            data: {
              getAllWilders: [
                {
                    name: "Raoul",
                    city: "Barcelone",
                    skills: [
                    {
                        title: "Twitter",
                        votes: 9
                    }
                    ]
                },
              ],
            },
          },
        },
      ]}
      addTypename={false}
    >
      <App />
    </MockedProvider>
  );

  const element = await waitFor(() => screen.findByText(/Raoul/i));
  expect(element).toBeInTheDocument();
});

test("Wilder Skills", async () => {
  render(
    <MockedProvider
      mocks={[
        {
          request: {
            query: ALL_WILDERS,
          },
          result: {
            data: {
              getAllWilders: [
                {
                    name: "Raoul",
                    city: "Barcelone",
                    skills: [
                    {
                        title: "Twitter",
                        votes: 9
                    }
                    ]
                },
              ],
            },
          },
        },
      ]}
      addTypename={false}
    >
      <App />
    </MockedProvider>
  );

  const element = await waitFor(() => screen.findByText(/Twitter/i));
  expect(element).toBeInTheDocument();
});

test("error", async () => {
  render(
    <MockedProvider
      mocks={[
        {
          request: {
            query: ALL_WILDERS,
          },
          result: {
             errors: [new GraphQLError('Error')],
          },
        },
      ]}
      addTypename={false}
    >
      <App />
    </MockedProvider>
  );

  const element = await waitFor(() => screen.findByText("Error :("));
  expect(element).toBeInTheDocument();
});