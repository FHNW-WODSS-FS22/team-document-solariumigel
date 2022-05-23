import { render, screen, fireEvent} from '@testing-library/react';
import Paragraph from './Paragraph';
import { HubConnection } from '@microsoft/signalr';
jest.mock('@microsoft/signalr');

const hubConnection = new HubConnection();

const mockedOnDelete = jest.fn();
const mockedUpdateText = jest.fn();
const mockedListenForText = jest.fn();

const testParagraph = {
    id: 123456,
    owner: 'Peter'
};

test('paragraph owner is correct', () => { 
    render(<Paragraph paragraph={testParagraph}/>);
    const paragraphOwner = screen.getByTestId('paragraph-owner');
    expect(paragraphOwner.textContent).toBe("Paragraph owner: Peter");
    }
)

test('paragraph locked is correct', async () => { 
    render(<Paragraph paragraph={testParagraph}/>);
    const paragraphBearbeiter = screen.getByTestId('paragraph-bearbeiter');
    expect(await paragraphBearbeiter.textContent).toBe("Wird bearbeitet von: ");
    }
)

test('delete paragraph with btn', async() => {
    render(<Paragraph paragraph={testParagraph} onDelete={mockedOnDelete}/>);
    const deleteButton = screen.getByTestId('delete-btn');
    fireEvent.click(deleteButton);
    expect(mockedOnDelete).toHaveBeenCalledTimes(1);
})

test('textarea can be edited', async() => {
    render(<Paragraph paragraph={testParagraph} onChange={mockedUpdateText} 
        connection={hubConnection} on={("", mockedListenForText)}/>);
    const inputElement = screen.getByTestId('paragraph-textarea');
    fireEvent.change(inputElement, {target: {value: "Test Eintrag"}});
    expect(inputElement.value).toBe("Test Eintrag");
})