namespace ServerApi.Document
{
    public class User
    {
        public User(string name, string connectionId)
        {
            Name = name;
            ConncetionId = connectionId;
        }
        public string ParagraphId {get; set;} = "";
        public string Name{get;}
        public string ConncetionId{get;}
    }
}