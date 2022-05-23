import { render, screen, fireEvent} from '@testing-library/react';
import LoginPopup from './LoginPopup';
import UserProvider from '../helpers/UserProvider';


const mockedOnClick = jest.fn();
const mockedSetTrigger = jest.fn();
const mockedGetUser = jest.fn();

const userProvider = new UserProvider();

test('Enter button is enabled', async()=>{
    render(<LoginPopup trigger={true} userProvider={userProvider} getUser={mockedGetUser} />);
    expect(await screen.findByRole('button', {name: /Enter/i})).toBeEnabled();
    }
)

test('should render input element', () => {
    render(<LoginPopup trigger={true} userProvider={userProvider} getUser={mockedGetUser} />);
    const inputElement = screen.getByTestId('userName-input');
    expect(inputElement).toBeInTheDocument();
    }
)   

test('should be able to type in input', async() => {
    render(<LoginPopup trigger={true} userProvider={userProvider} getUser={mockedGetUser} setTrigger={mockedSetTrigger}/>);
    const inputElement = screen.getByTestId('userName-input');
    const enterButtonElement = screen.getByTestId('enter-btn');
    fireEvent.change(inputElement, {target: {value: "Test Dokument"}});
    fireEvent.click(enterButtonElement);
    expect(inputElement.value).toBe("Test Dokument");
  });

test('closebutton closes popup', async() => {
    render(<LoginPopup trigger={true} userProvider={userProvider} getUser={mockedGetUser} onClick={mockedOnClick} setTrigger={mockedSetTrigger}/>);
    const buttonElement = screen.getByTestId('close-btn');
    fireEvent.click(buttonElement);
    expect(mockedSetTrigger).toHaveBeenCalledTimes(1);
  });
