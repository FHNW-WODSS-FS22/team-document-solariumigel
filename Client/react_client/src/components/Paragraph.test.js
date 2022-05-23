import { render, screen, fireEvent} from '@testing-library/react';
import Paragraph from './Paragraph';
import { HubConnection } from '@microsoft/signalr';
import UserProvider from '../helpers/UserProvider';
jest.mock('@microsoft/signalr');

const hubConnection = new HubConnection();
const userProvider = new UserProvider();

const mockedOnDelete = jest.fn();
const mockedUpdateText = jest.fn();
const mockedListenForText = jest.fn();
const mockedGetUser = jest.fn();

const testParagraph = {
    id: 123456,
    owner: 'Peter',
    position: 1
};

const testDocument = {
    id: 987676
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
    render(<Paragraph paragraph={testParagraph} onChange={mockedUpdateText} connection={hubConnection} on={("", mockedListenForText)} />);
    const inputElement = screen.getByTestId('paragraph-textarea');
    fireEvent.change(inputElement, {target: {value: "Test Eintrag"}});
    expect(inputElement.value).toBe("Test Eintrag");
})

test('test onClick textArea', async() => {
    render(<Paragraph paragraph={testParagraph} onChange={mockedUpdateText} connection={hubConnection} 
        on={("", mockedListenForText)} send={("", testDocument.id, testParagraph.id, userProvider)} userProvider={userProvider} getUser={mockedGetUser}/>);
    const inputElement = screen.getByTestId('paragraph-textarea');
    fireEvent.click(inputElement);
    expect(testDocument.id).toBe(987676);
    expect(testParagraph.id).toBe(123456);
})

test('arrow up can be clicked', async() => {
    render(<Paragraph paragraph={testParagraph} connection={hubConnection} send={("", testDocument.id, testParagraph.id)} />);
    const arrowUpButton = screen.getByTestId('arrowup-btn');
    fireEvent.click(arrowUpButton);
    expect(testParagraph.id).toBe(123456);
    expect(testDocument.id).toBe(987676);
})

test('paragraph position', async() => {
    render(<Paragraph paragraph={testParagraph} position={testParagraph.position}/>);
    const positionElement = screen.getByTestId('paragraph-position');
    expect(positionElement.textContent).toBe("1");
  })

test('arrow down can be clicked', async() => {
    render(<Paragraph paragraph={testParagraph} connection={hubConnection} send={("", testDocument.id, testParagraph.id)} />);
    const arrwoDownButton = screen.getByTestId('arrowdown-btn');
    fireEvent.click(arrwoDownButton);
    expect(testParagraph.id).toBe(123456);
    expect(testDocument.id).toBe(987676);
})
