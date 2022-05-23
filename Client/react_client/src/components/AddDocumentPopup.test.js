import { render, screen, fireEvent} from '@testing-library/react';
import AddDocumentPopup from './AddDocumentPopup';

const mockedOnChange = jest.fn();
const mockedOnClick = jest.fn();
const mockedSetTrigger = jest.fn();
const mockedCreateDoc = jest.fn();

test('Add button is enabled', async() => {
  render(<AddDocumentPopup trigger={true}/>);
   expect(await screen.findByRole('button', {name: /Add/i})).toBeEnabled();
});

test('should render input element', async() => {
    render(<AddDocumentPopup trigger={true}/>);
    const inputElement = screen.getByPlaceholderText(/Document name/i);
    expect(inputElement).toBeInTheDocument();
  });

test('should be able to type in input', async() => {
    render(<AddDocumentPopup trigger={true} onChange={mockedOnChange} setTrigger={mockedSetTrigger} createDoc={mockedCreateDoc}/>);
    const inputElement = screen.getByPlaceholderText(/Document name/i);
    const createButtonElement = screen.getByTestId('create-btn');
    fireEvent.change(inputElement, {target: {value: "Test Dokument"}});
    fireEvent.click(createButtonElement);
    expect(inputElement.value).toBe("Test Dokument");
  });

  test('closebutton closes popup', async() => {
    render(<AddDocumentPopup trigger={true} onClick={mockedOnClick} setTrigger={mockedSetTrigger}/>);
    const buttonElement = screen.getByTestId('close-btn');
    fireEvent.click(buttonElement);
    expect(mockedSetTrigger).toHaveBeenCalledTimes(1);
  });