using Microsoft.VisualStudio.TestTools.UnitTesting;
using FluentAssertions;
using FakeItEasy;
using ServerApi.Document;
using System.Collections.Generic;

namespace ServerApi.Test.Document
{
    [TestClass]
    public class DocumentControllerTest
    {
        DocumentController _testee;
        IDocumentClient _client;

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
    }
}