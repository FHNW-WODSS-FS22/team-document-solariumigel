export default class DocumentProvider {

    setDocument(doc) {
        this.document = doc;
    }

    getDocument(){
        return this.document
    }

    addParagraph(paragraph){
        this.document.paragraph = this.document.paragraph.concat(paragraph)
    }

    removeParagraph(paragraphId){
        this.document.paragraph = this.document.paragraph.filter(((paragraph) => paragraph.id !== paragraphId))
    }

    getParagraphs(){
        return this.document.paragraph
    }

    hasParagraphs(){
        return this.document.paragraph.Length != 0
    }
}