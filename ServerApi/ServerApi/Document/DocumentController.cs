using Microsoft.AspNetCore.Mvc;

namespace ServerApi.Document
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : ControllerBase
    {
        [HttpGet]
        public List<string> GetDocuments()
        {
            return new List<string>();
        }
    }
}
