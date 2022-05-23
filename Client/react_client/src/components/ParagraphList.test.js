import { render} from '@testing-library/react';
import ParagraphList from './ParagraphList';
import DocumentProvider from '../helpers/DocumentProvider';
import Paragraph from "../components/Paragraph";

const documentProvider = new DocumentProvider();

const mockedGetParagraphItems = jest.fn();
const mockedSetDocument = jest.fn();

test('paragraphs can be added', async() => {
    render(<ParagraphList documentProvider={documentProvider} getParagraphItems={mockedGetParagraphItems} setDocument={mockedSetDocument} />);
    const items = [
        <Paragraph
            connection={null}
            documentId={0}
            paragraph={null}
            documentProvider={documentProvider}
            text={"test paragraph"}
            position={0}
            userProvider={null}
            key={null}
            onDelete={null}
        />
    ]
    documentProvider.setParagraphItems(items);
    documentProvider.addParagraphItem(items);
    expect(await documentProvider.getParagraphItems().length).toBe(2);
})

test('paragraphs can be deleted', async() => {
    render(<ParagraphList documentProvider={documentProvider}/>);
    const items = [
        <Paragraph
            connection={null}
            documentId={0}
            paragraph={{id: 20}}
            documentProvider={documentProvider}
            text={"test paragraph"}
            position={0}
            userProvider={null}
            key={null}
            onDelete={null}
        />
    ]
    documentProvider.setParagraphItems(items);
    documentProvider.removeParagraphItem(20);
    expect(await documentProvider.getParagraphItems().length).toBe(0);
})

test('sort paragraphs', async() => {
    render(<ParagraphList documentProvider={documentProvider}/>);
    const items = [
        <Paragraph
            connection={null}
            documentId={0}
            paragraph={{id: 25}}
            documentProvider={documentProvider}
            text={"test paragraph"}
            position={1}
            userProvider={null}
            key={null}
            onDelete={null}
        />,
        <Paragraph
            connection={null}
            documentId={0}
            paragraph={{id: 20}}
            documentProvider={documentProvider}
            text={"test paragraph"}
            position={0}
            userProvider={null}
            key={null}
            onDelete={null}
        />
    ]
    documentProvider.setParagraphItems(items);
    const sorted = documentProvider
      .getParagraphItems(items)
      .slice(0)
      .sort((a, b) =>
        a.props.paragraph.position > b.props.paragraph.position ? 1 : -1
      );
    documentProvider.setParagraphItems(sorted);
    expect(await documentProvider.getParagraphItems()[0].props.paragraph.id).toBe(20)
})