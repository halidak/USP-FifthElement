import {render, screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from "../components/forms/LoginForm";


jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    Link: jest.fn()
}));

jest.mock('axios');

jest.mock('react', () => {
    const original = jest.requireActual('react');
    return {
      ...original,
      useState: jest.fn(),
      useEffect: jest.fn(),
      useContext: jest.fn()
    };
});

const mockContext = {
    setAuth: jest.fn(),
};

jest.mock('react', () => {
    const original = jest.requireActual('react');
    return {
      ...original,
      useContext: () => mockContext
    };
  });

test('login form test validation', () => {
    global.window.google = {
        accounts: {
          id: {
            initialize: jest.fn(),
            renderButton: jest.fn()
          }
        }
      };
    render(<LoginForm />);
    const email = screen.getByPlaceholderText("email");
    const password = screen.getByPlaceholderText("password");
    const button = screen.getByTestId("submit-button");

    userEvent.type(email, "halida.karisik");
    userEvent.type(password, "123456");
    userEvent.click(button);
    const error = screen.getByText("Unesite validan email.");
    expect(error).toBeDefined();
})