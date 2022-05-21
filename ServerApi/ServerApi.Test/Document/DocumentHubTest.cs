using Microsoft.VisualStudio.TestTools.UnitTesting;
using FluentAssertions;

namespace ServerApi.Test.Document
{
    [TestClass]
    public class DocumentHubTest
    {
        [TestMethod]
        public void Test()
        {
            string actual = "ABCDEFGHI";
            actual.Should().StartWith("AB").And.EndWith("HI").And.Contain("EF").And.HaveLength(9);
        }
    }
}