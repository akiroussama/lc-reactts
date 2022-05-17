import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App from "./App";
import { ALL_WILDERS } from "./gql/queries/getAllWilders";
import { GraphQLError } from "graphql";

it("loading", () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

it("errors", async () => {
    const errorMock = {
    request: {
      query: ALL_WILDERS,
    },
    result: {
       errors: [new GraphQLError('An error occurred')],
    },
  };
  render(
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const element = await waitFor(() => screen.findByText("Error :("));
  expect(element).toBeInTheDocument();
});

it("Wilder Name", async () => {
    const wilderTestMock = {
    request: {
      query: ALL_WILDERS,
    },
    result: {
       data: {
           getAllWilders:   [{
                    name: "Raoul",
                    city: "Barcelone",
                    skills: [
                    {
                        title: "Twitter",
                        votes: 9
                    }
                    ]
           }],
        },
    },
  };
  render(
    <MockedProvider mocks={[wilderTestMock]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const element = await waitFor(() => screen.findByText(/Raoul/i));
  expect(element).toBeInTheDocument();
});



it("Wilder Skills", async () => {
    const wilderTestMock = {
    request: {
      query: ALL_WILDERS,
    },
    result: {
       data: {
           getAllWilders:   [{
                    name: "Raoul",
                    city: "Barcelone",
                    skills: [
                    {
                        title: "Twitter",
                        votes: 9
                    }
                    ]
           }],
        },
    },
  };
  render(
    <MockedProvider mocks={[wilderTestMock]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const element = await waitFor(() => screen.findByText(/Twitter/i));
  expect(element).toBeInTheDocument();
});
