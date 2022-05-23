export default class DocumentProvider {
  setDocument(doc) {
    this.document = doc;
  }

  getDocument() {
    return this.document;
  }

  addParagraph(paragraph) {
    this.document.paragraph = this.document.paragraph.concat(paragraph);
  }

  removeParagraph(paragraphId) {
    this.document.paragraph = this.document.paragraph.filter(
      (paragraph) => paragraph.id !== paragraphId
    );
  }

  getParagraphs() {
    return this.document.paragraph;
  }

  hasParagraphs() {
    return this.document.paragraph.Length !== 0;
  }

  //ParagraphItems
  setParagraphItems(paragraphItems) {
    this.paragraphItems = paragraphItems;
  }

  getParagraphItems() {
    return this.paragraphItems;
  }

  addParagraphItem(paragraphItem) {
    this.paragraphItems = this.paragraphItems.concat(paragraphItem);
  }

  removeParagraphItem(paragraphId) {
    this.paragraphItems = this.paragraphItems.filter(
      (item) => item.props.paragraph.id !== paragraphId
    );
  }

  //Users
  setDocumentUser(users) {
    this.users = users;
  }

  getUsers() {
    return this.users;
  }

  addUser(user) {
    this.users = this.users.concat(user);
  }

  removeUser(user) {
    this.users = this.users.filter((u) => u !== user);
  }
}
