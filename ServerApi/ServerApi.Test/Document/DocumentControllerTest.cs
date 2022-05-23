using Microsoft.VisualStudio.TestTools.UnitTesting;
using FluentAssertions;
using FakeItEasy;
using ServerApi.Document;
using System.Collections.Generic;
using System;

namespace ServerApi.Test.Document
{
    [TestClass]
    public class DocumentControllerTest
    {
        private DocumentController _testee;
        private IDocumentClient _client;

        [TestInitialize]
        public void Initialize()
        {
            _client = A.Fake<IDocumentClient>();
            _testee = new DocumentController(_client);
        }

        [TestMethod]
        public void TestGetDocuments_ReturnAllDDocumentFromClient()
        {
            var documents = new List<DocumentEntity>{
                new DocumentEntity{Id = "Julian"},
                new DocumentEntity{Id = "Peter"}
            };
            A.CallTo(() => _client.FindAll()).Returns(documents);
            var result = _testee.GetDocuments();

            result.Should().BeEquivalentTo(documents);
        }

        [TestMethod]
        public void TestGetDocument_ReturnRelevantDocument()
        {
            var relevantDocument = new DocumentEntity{Id = "Julian"};

            A.CallTo(() => _client.Find("Julian")).Returns(relevantDocument);
            var result = _testee.GetDocument("Julian");

            result.Should().BeEquivalentTo(relevantDocument);
        }

        [TestMethod]
        public void TestPostDocuments_DocumentIsSendedToClient()
        {
            var relevantDocument = new DocumentEntity{Id = "Julian"};

            var result = _testee.PostDocuments(new DocumentData{Name = "Test", Owner="Julian"});

            A.CallTo(() => _client.Insert(A<DocumentEntity>.That.Matches(h => h.Name == "Test" 
                && h.Owner == "Julian"
                && h.Paragraph.Count == 1
            ))).MustHaveHappened();
        }

        
    }
}